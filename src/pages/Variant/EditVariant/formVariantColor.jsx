import React, { useState } from 'react'
import env from '../../../config/env';
import useApi from '../../../hooks/useApi';
import colorService from '../../../services/colorService';

const FormVariantColor = ({ variantColor, setVariantColor }) => {
  const { data: resColorAllActive } = useApi(colorService.getAllActive, true);
  const [newColorId, setNewColorId] = useState("")

  const handleChangeVariantColor = (idColor, event) => {
    const { name, value, type, files } = event.target;
    
    setVariantColor(prev =>
      prev.map(color => {
        if (color._id == idColor) {
          let newImg = color.img
          if (type == 'file' && files[0]) {
            const oldImg = newImg;
            // Tạo ảnh blob mới
            newImg = URL.createObjectURL(files[0])
            // Xoá ảnh blob cũ
            if (newImg.startsWith('blob:')) URL.revokeObjectURL(oldImg)
          }
          return {
            ...color,
            [name]: type == 'file' ? files[0] : value,
            // Tạo hình ảnh blob
            img: newImg
          }
        } else {
          return color
        }
      }
      ))
  }

  const handleAddVariantColor = (idColor) => {
    const color = resColorAllActive?.items?.find(item => item?._id == idColor);
    setVariantColor(prev => ([
      ...prev,
      {
        color_id: color?._id,
        color_name: color?.name,
        price: 0,
        stock: 0,
        img: ''
      }
    ]))

    setNewColorId("");


  }

  const handleRemoveVariantColor = (idColor) => {
    const confirmed = confirm('Bạn có chắc muốn xoá không?');
    if(confirmed){
      variantColor?.forEach(varColor => {
        if(varColor?.color_id === idColor && varColor?.img?.startsWith('blob:')) {
          URL.revokeObjectURL(varColor.img)
        }
      })
      setVariantColor(prev => prev.filter(item => item?.color_id != idColor))
    }
  }

  return (
    <div className='my-2'>
      <strong>Biến thể</strong>
      <p className='text-danger'>Những màu sắc không có <strong><i>giá</i></strong> hoặc <strong><i>số lượng</i></strong> hoặc <strong><i>hình ảnh</i></strong> sẽ không được thêm</p>
      <div>
        <div style={{ maxHeight: "300px", overflowY: 'auto' }}>
          <table id='table_add_variant' className=' table table-bordered'  >
            <thead>
              <tr className='text-center' >
                <th className='align-content-center'>#</th>
                <th className='align-content-center'>Màu sắc</th>
                <th className='align-content-center'>Giá</th>
                <th className='align-content-center'>Số lượng</th>
                <th className='align-content-center'>Hình ảnh</th>
                <th>Preview</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody id='table_body_add_variant' >
              {variantColor?.map((varColor, index) => (
                <tr key={index} className='text-center' >
                  <th className='align-content-center'>{index + 1}</th>
                  <th className='align-content-center'>{varColor.color_name}</th>
                  <td className='align-content-center'><input name='price' type="number" className='form-control' min={0} defaultValue={varColor.price} onChange={(event) => handleChangeVariantColor(varColor?._id, event)} /></td>
                  <td className='align-content-center'><input name='stock' type="number" className='form-control' min={0} defaultValue={varColor.stock} onChange={(event) => handleChangeVariantColor(varColor?._id, event)} /></td>
                  <td className='align-content-center'>
                    <label htmlFor={`file-upload-${varColor.color_id}`} className="btn btn-primary btn-sm">
                      Chọn ảnh
                    </label>
                    <input id={`file-upload-${varColor.color_id}`} name='image' type="file" className='d-none' onChange={(event) => handleChangeVariantColor(varColor?._id, event)} /></td>
                  <td className='align-content-center'><img style={{ width: '50px', height: '50px', objectFit: 'cover' }} src={`${varColor?.img?.includes('blob') ? varColor.img : env.VITE_SERVER_BASE_URL + '/' + varColor.img}`} alt="Chưa có ảnh" /></td>
                  <td className='align-content-center'><button type='button' className='btn btn-sm btn-danger' onClick={() => handleRemoveVariantColor(varColor?.color_id)}>🗑 Xoá</button></td>
                </tr>
              ))}
            </tbody>
            <tfoot className='text-center'>
              <tr>
                <td className='align-content-center' colSpan="6">
                  <select name="" className='form-control' value={newColorId} onChange={(e) => setNewColorId(e.target.value)}>
                    <option value="">--Chọn màu sắc--</option>
                    {
                      resColorAllActive?.items?.length && resColorAllActive.items.map((color, index) => (
                        <option key={index} value={color?._id}>{color?.name}</option>
                      ))
                    }
                  </select>
                </td>
                <td className='align-content-center'>
                  <button type="button" disabled={variantColor?.length && variantColor?.some(item => item?.color_id == newColorId)} className='btn btn-sm btn-success' onClick={() => handleAddVariantColor(newColorId)}>✙ Thêm</button>
                </td>
              </tr>
            </tfoot>
          </table>

        </div>
      </div>
    </div>
  )
}

export default FormVariantColor
