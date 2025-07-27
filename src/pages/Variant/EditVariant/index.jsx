import React, { useEffect, useState } from 'react'
import FormVariant from './formVariant'
import useApi from '../../../hooks/useApi'
import variantService from '../../../services/variantService'
import { Link, useParams } from 'react-router-dom'
import FormSpecification from './formSpecification'
import FormVariantColor from './formVariantColor'
import colorService from '../../../services/colorService'
import specificationService from '../../../services/specificationService'
import productService from '../../../services/productService'

const EditVariant = () => {

  const { id } = useParams();
  const { data: resColorAllActive, fetchApi: fetchColorAllActive } = useApi(colorService.getAllActive, true);
  const { data: resProductAllActive } = useApi(productService.getAllActive, true);

  const { data: dataDetailVariant, fetchApi: fetchDetailVariant } = useApi(variantService.getDetailById, true, id)
  const { response: resUpdateVariant, fetchApi: fetchUpdateVariant } = useApi(variantService.update);
  const { data: resSpecAllActive, fetchApi: fetchSpecificationAllActive } = useApi(specificationService.getAllActive, true);

  const [formVariant, setFormVariant] = useState({
    name: "",
    is_active: false,
    product_id: '',
    description: ''
  })

  console.log(formVariant);
  

  const [specs, setSpecs] = useState([]);
  const [variantColor, setVariantColor] = useState([]);

  useEffect(() => {
    if (dataDetailVariant) {
      if (dataDetailVariant?.variant) {
        setFormVariant(prev => ({
          ...prev,
          name: dataDetailVariant.variant?.name,
          is_active: dataDetailVariant.variant?.is_active,
          product_id: dataDetailVariant.variant?.product_id,
          description: dataDetailVariant.variant?.description,
        }))
      }

      if (dataDetailVariant?.variantSpecification) {
        setSpecs(dataDetailVariant.variantSpecification.map(spec => ({
          _id: spec?.specification?._id,
          name: spec?.specification?.name,
          value: spec.value
        })))
      }

      if (dataDetailVariant?.variantColor) {
        setVariantColor(dataDetailVariant?.variantColor?.map(varColor => ({
          color_id: varColor?.color_id,
          color_name: varColor?.color?.name,
          price: varColor?.price,
          stock: varColor?.stock,
          img: varColor?.img,
          is_active: varColor?.is_active
        })))
      }
    }
  }, [dataDetailVariant])

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formColor = variantColor.filter(varColor => varColor.quantity != 0 && varColor.price != 0 && varColor?.img).map(varColor => {
      // const formColor = variantColor.map(varColor => {
      const { img, color_name, name, ...cloneVarColor } = varColor
      return cloneVarColor
    })

    const formSpec = specs.filter(spec => spec?.value?.trim()).map(spec => {
      const { name, ...cloneSpec } = spec
      return cloneSpec
    })

    const formData = new FormData;
    formData.append('variant', JSON.stringify(formVariant))
    formData.append('specifications', JSON.stringify(formSpec))
    formData.append('colors', JSON.stringify(formColor))
    formColor?.forEach(color => {
      if (color?.image) {
        formData.append('images', color.image)
        formData.append('image_color_ids[]', color?.color_id)
      }
    });

    
    fetchUpdateVariant(id, formData)
  }

  useEffect(() => {
    if (resUpdateVariant && resUpdateVariant?.success) {
      fetchColorAllActive()
      fetchDetailVariant(id)
      fetchSpecificationAllActive()
    }
  }, [resUpdateVariant])

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <strong>Chỉnh sửa biến thể</strong>
        </div>
        <div className="card-body card-block">
          <form
            method="post"
            encType="multipart/form-data"
            className="form-horizontal"
          >
            <FormVariant resProductAllActive={resProductAllActive} formVariant={formVariant} setFormVariant={setFormVariant} />
            <FormSpecification resSpecAllActive={resSpecAllActive} specs={specs} setSpecs={setSpecs} />
            <FormVariantColor resColorAllActive={resColorAllActive} variantColor={variantColor} setVariantColor={setVariantColor} />


          </form>
        </div>
        <div className="card-footer">
          <Link to="/variant" className='btn btn-sm'>Quay lại</Link>
          <button className='' style={{ cursor: 'pointer' }} type="submit" onClick={(event) => handleSubmit(event)} >
            <i className="fa fa-dot-circle-o" /> Cập nhật
          </button>
       
        </div>


      </div>
    </div>
  )
}

export default EditVariant
