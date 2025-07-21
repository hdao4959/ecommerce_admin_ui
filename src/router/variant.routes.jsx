import ListVariant from "../pages/Variant"
import AddVariant from "../pages/Variant/AddVariant/index.jsx"

const variantRoutes = [
  {
    path: 'variant/add', element: <AddVariant />
  },
  {
    path: 'variant', element: <ListVariant/>
  }
]

export default variantRoutes
