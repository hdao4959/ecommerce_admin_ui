import React, { useEffect } from 'react'
import ScriptLoader from '../../common/ScriptLoader'

const ListCategory = () => {
  const arrayCss = [
    "/assets/css/lib/datatable/dataTables.bootstrap.min.css",
    'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800'
  ]
  const arrayScripts = [
    "/assets/js/lib/data-table/datatables.min.js",
    "/assets/js/lib/data-table/dataTables.bootstrap.min.js",
    "/assets/js/lib/data-table/dataTables.buttons.min.js",
    "/assets/js/lib/data-table/buttons.bootstrap.min.js",
    "/assets/js/lib/data-table/jszip.min.js",
    "/assets/js/lib/data-table/vfs_fonts.js",
    "/assets/js/lib/data-table/buttons.html5.min.js",
    "/assets/js/lib/data-table/buttons.print.min.js",
    "/assets/js/lib/data-table/buttons.colVis.min.js",
    "/assets/js/init/datatables-init.js"
  ]
 ScriptLoader(arrayCss, arrayScripts)

  return (
      <>
  

    
    <div className="animated fadeIn">
      <div className="row ">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <strong className="card-title">Data Table</strong>
            </div>
            <div className="card-body">
              <table
                id="bootstrap-data-table"
                className="table table-striped table-bordered"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Office</th>
                    <th>Salary</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                
                  <tr>
                    <td>Donna Snider</td>
                    <td>Customer Support</td>
                    <td>New York</td>
                    <td>$112,000</td>
                    <td>
                      <div className="d-flex justify-content-around"> 
                      <button className='btn btn-success'>Chi tiết</button>
                      <button className='btn btn-secondary'>Sửa</button>
                      <button className='btn btn-danger'>Xoá</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default ListCategory
