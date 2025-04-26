import React from 'react'
import ListCategory from '../pages/Category'
import AddCategory from '../pages/Category/AddCategory'
import ChildrenCategory from '../pages/Category/ChildrenCategory'

const categoryRoutes = [
  {
    path: 'category', element: <ListCategory />
  },
  {
    path: 'category/add', element: <AddCategory />
  },
  {
    path: 'category/:id', element: <ChildrenCategory/>
  }
]

export default categoryRoutes
