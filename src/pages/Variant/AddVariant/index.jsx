import React, { useEffect, useState } from 'react'
import useApi from '../../../hooks/useApi'
import colorService from '../../../services/colorService'
import { useNavigate } from 'react-router-dom'
import variantService from '../../../services/variantService'
import FormVariant from './formVariant'
import FormSpecification from './formSpecification'
import FormColor from './formColor'

const AddVariant = () => {
  const { data: resColorAllActive } = useApi(colorService.getAllActive, true);
  const { response: responseAddVariant, fetchApi: fetchAddVariant } = useApi(variantService.create);
  const navigate = useNavigate()
  const [formVariant, setFormVariant] = useState({
    name: "",
    is_active: false,
    product_id: '',
    description: ''
  })

  const [specs, setSpecs] = useState([]);
  const [colorActives, setColorActives] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formColor = colorActives.filter(color => color?.quantity != 0 && color?.price != 0 && color?.img).map(color => {
      const cloneColor = { ...color }
      delete cloneColor.img
      delete cloneColor.name
      return cloneColor
    })
    
    const formSpec = specs.filter(spec => spec.value).map(spec => {
      const cloneSpec = {...spec}
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




    fetchAddVariant(formData)
  }


  useEffect(() => {
    if (resColorAllActive) {
      setColorActives(resColorAllActive.items.map(color => ({ ...color, price: 0, stock: 0, image: color?.image || null, img: null })))
    }
  }, [resColorAllActive])

  useEffect(() => {
    if (responseAddVariant && responseAddVariant?.success) {
      navigate('/variant')
    }
  }, [responseAddVariant])

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <strong>Thêm mới biến thể</strong>
        </div>
        <div className="card-body card-block">
          <form
            method="post"
            encType="multipart/form-data"
            className="form-horizontal"
          >
            <FormVariant formVariant={formVariant} setFormVariant={setFormVariant} />
            <FormSpecification specs={specs} setSpecs={setSpecs} />
            <FormColor colorActives={colorActives} setColorActives={setColorActives} />
           

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

export default AddVariant
