import React, { useState } from 'react'
import useApi from '../../../hooks/useApi';
import specificationService from '../../../services/specificationService';

const FormSpecification = ({ specs, setSpecs }) => {
  const { data: resSpecAllActive } = useApi(specificationService.getAllActive, true);

  const [newSelectId, setNewSelectId] = useState(null)

  const handleAddSpec = (e, idSpec) => {
    e.preventDefault();
    if (!idSpec) return

    const spec = resSpecAllActive?.items?.find(spec => spec._id == idSpec);
    if (!spec) {
      alert('Thông số không tồn tại!')
    } else {
      setSpecs(prev => ([
        ...prev,
        {
          _id: spec?._id,
          name: spec?.name,
          value: ""
        }
      ]))
      setNewSelectId(null)
    }
  }

  const handleRemoveSpec = (index) => {
    setSpecs(prev => prev.filter((spec, i) => i != index))
  }

  const handleChangeSpec = (index, value) => {
    setSpecs(prev => prev.map((spec, i) =>
      i == index ?
        {
          ...spec,
          value: value
        } : spec))
  }
  return (
    <div className="my-3">
      <strong>Thông số kỹ thuật</strong>
      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr className='text-center'>
            <th>#</th>
            <th>Thông số</th>
            <th>Giá trị</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {specs?.length > 0 && specs?.map((spec, index) => (
            <tr key={index} className='text-center'>
              <th className='align-content-center'>{index + 1}</th>
              <th className='align-content-center'>{spec.name}</th>
              <td className='align-content-center'>
                <input
                  type="text"
                  className="form-control"
                  value={spec.value}
                  onChange={(e) => handleChangeSpec(index, e.target.value)}
                />
              </td>
              <td className='align-content-center'>
                <button
                  type='button'
                  className="btn btn-sm btn-danger"
                  onClick={() => handleRemoveSpec(index)}
                >
                  🗑 Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className='text-center'>
            <td colSpan="3" className='align-content-center'>
              <div>
                <select
                  className="form-control"
                  value={newSelectId || ""}
                  onChange={(e) => setNewSelectId(e.target.value)}
                >
                  <option value="">-- Chọn thông số --</option>
                  {resSpecAllActive?.items?.map((spec) => (
                    <option key={spec._id} value={spec._id}>
                      {spec.name}
                    </option>
                  ))}
                </select>
              </div>
            </td>
            <td className='align-content-center'>
              <button
                type='button'
                className="btn btn-success btn-sm"
                onClick={(e) => handleAddSpec(e, newSelectId)}
                disabled={specs.map( spec => spec._id).includes(newSelectId)}
              >
                ✙ Thêm
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default FormSpecification
