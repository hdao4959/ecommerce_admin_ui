import React from 'react'
import ListProduct from '../pages/Product'
import AddProduct from '../pages/Product/AddProduct'

const productRoutes = [
  {
    path: 'product', element: <ListProduct />
  },
  {
    path: 'product/add', element: <AddProduct />
  }
]

export default productRoutes
