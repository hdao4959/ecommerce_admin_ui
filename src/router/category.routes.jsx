import React from 'react'
import ListCategory from '../pages/Category'
import AddCategory from '../pages/Category/AddCategory'
import DetailCategory from '../pages/Category/DetailCategory'
import UpdateCategory from '../pages/Category/UpdateCategory'

const categoryRoutes = [
  {
    path: 'category', element: <ListCategory />
  },
  {
    path: 'category/add', element: <AddCategory />
  },
  {
    path: 'category/:id/edit', element: <UpdateCategory />
  },
  {
    path: 'category/:id', element: <DetailCategory/>
  }
]

export default categoryRoutes
