import React, { useEffect, useState } from 'react'
import FormVariant from './formVariant'
import useApi from '../../../hooks/useApi'
import variantService from '../../../services/variantService'
import { useParams } from 'react-router-dom'
import FormSpecification from './formSpecification'
import FormVariantColor from './formVariantColor'
import colorService from '../../../services/colorService'

const EditVariant = () => {

  const { id } = useParams();

  const { data: dataDetailVariant } = useApi(variantService.getDetailById, true, id)
  const { fetchApi: fetchUpdateVariant } = useApi(variantService.update);

  const [formVariant, setFormVariant] = useState({
    name: "",
    is_active: false,
    product_id: '',
    description: ''
  })

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
          _id: spec._id,
          name: spec?.specification?.name,
          value: spec.value
        })))
      }

      if (dataDetailVariant?.variantColor) {
        setVariantColor(dataDetailVariant?.variantColor?.map(varColor => ({
          _id: varColor?._id,
          color_id: varColor?.color_id,
          color_name: varColor?.color?.name,
          price: varColor?.price,
          stock: varColor?.stock,
          img: varColor?.img
        })))
      }
    }
  }, [dataDetailVariant])


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formColor = variantColor.filter(varColor => varColor.quantity != 0 && varColor.price != 0 && varColor?.img).map(varColor => {
      const cloneVarColor = { ...varColor }
      delete cloneVarColor.img
      delete cloneVarColor.name
      return cloneVarColor
    })
    const formSpec = specs.filter(spec => spec.value).map(spec => {
      const cloneSpec = { ...spec }
      delete cloneSpec.name
      return cloneSpec
    })

    const formData = new FormData;
    formData.append('variant', JSON.stringify(formVariant))
    formData.append('specifications', JSON.stringify(formSpec))
    formData.append('colors', JSON.stringify(formColor))
    formColor?.forEach(color => {
      formData.append('images', color.image)
    });
    fetchUpdateVariant(id, formData)
  }

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
            <FormVariant formVariant={formVariant} setFormVariant={setFormVariant} />
            <FormSpecification specs={specs} setSpecs={setSpecs} />
            <FormVariantColor variantColor={variantColor} setVariantColor={setVariantColor} />


          </form>
        </div>
        <div className="card-footer">
          <button className='' style={{ cursor: 'pointer' }} type="submit" onClick={(event) => handleSubmit(event)} >
            <i className="fa fa-dot-circle-o" /> Submit
          </button>
          <button type="reset" >
            <i className="fa fa-ban" /> Reset
          </button>
        </div>


      </div>


    </div>
  )
}

export default EditVariant
