import ListVariant from "../pages/Variant"
import AddVariant from "../pages/Variant/AddVariant/index.jsx"
import EditVariant from "../pages/Variant/EditVariant/index.jsx"

const variantRoutes = [
  {
    path: 'variant/add', element: <AddVariant />
  },
  {
    path: 'variant', element: <ListVariant/>
  }, {
    path: 'variant/:id/edit', element: <EditVariant/>
  }
]

export default variantRoutes
