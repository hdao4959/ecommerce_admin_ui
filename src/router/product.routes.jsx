import React from 'react'
import ListProduct from '../pages/Product'
import AddProduct1 from '../pages/Product/AddProduct'
import DetailProduct from '../pages/Product/DetailProduct'
const productRoutes = [
  {
    path: 'product', element: <ListProduct />
  },
  {
    path: 'product/add', element: <AddProduct1 />
  }, {
    path: 'product/:id', element: <DetailProduct/>
  }
]

export default productRoutes
