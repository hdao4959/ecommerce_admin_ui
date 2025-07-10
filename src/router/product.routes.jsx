import React from 'react'
import AddProduct1 from '../pages/Product/AddProduct'
import DetailProduct from '../pages/Product/DetailProduct'
import EditProduct from '../pages/Product/EditProduct'
import ListProduct from '../pages/Product'
const productRoutes = [
  {
    path: 'product', element: <ListProduct />
  },
  {
    path: 'product/add', element: <AddProduct1 />
  }, {
    path: 'product/:id', element: <DetailProduct/>
  }, {
    path: 'product/:id/edit', element: <EditProduct/>
  }
]

export default productRoutes
