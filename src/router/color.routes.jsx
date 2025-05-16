import React from 'react'
import ListColor from '../pages/Color'
import AddColor from '../pages/Color/AddColor'

const colorRoutes = [
  {
    path: '/color', element: <ListColor/>
  }, {
    path: '/color/add', element: <AddColor/>
  }
]

export default colorRoutes
