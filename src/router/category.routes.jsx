import React from 'react'
import ListCategory from '../pages/Category'
import AddCategory from '../pages/Category/AddCategory'

const categoryRoutes = [
  {
    path: 'category', element: <ListCategory />
  },
  {
    path: 'category/add', element: <AddCategory />
  }
]

export default categoryRoutes
