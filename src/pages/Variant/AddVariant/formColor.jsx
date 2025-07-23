import React from 'react'

const FormColor = ({colorActives, setColorActives}) => {

  console.log(colorActives);
  

  const handleChangeColor = (idColor, event) => {
    const { name, value, type, files } = event.target;

    setColorActives(prev =>
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
              </tr>
            </thead>
            <tbody id='table_body_add_variant' >
              {colorActives?.map((color, index) => (
                <tr key={index} className='text-center' >
                  <th className='align-content-center'>{index}</th>
                  <td className='align-content-center'>{color.name}</td>
                  <td className='align-content-center'><input name='price' type="number" className='form-control' min={0} defaultValue={color.price} onChange={(event) => handleChangeColor(color?._id, event)} /></td>
                  <td className='align-content-center'><input name='stock' type="number" className='form-control' min={0} defaultValue={color.stock} onChange={(event) => handleChangeColor(color?._id, event)} /></td>
                  <td className='align-content-center'>
                    <label htmlFor={`file-upload-${color._id}`} className="btn btn-primary btn-sm">
                      Chọn ảnh
                    </label>
                    <input id={`file-upload-${color._id}`} name='image' type="file" className='d-none' onChange={(event) => handleChangeColor(color?._id, event)} /></td>
                  <td className='align-content-center'><img style={{ width: '50px', height: '50px', objectFit: 'cover' }} src={color.img} alt="Chưa có ảnh" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default FormColor
