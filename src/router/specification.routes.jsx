import ListSpecification from "../pages/Specification";
import AddSpecification from "../pages/Specification/AddSpecification";

const specificationRoutes = [
  {
    path: '/specification', element: <ListSpecification/>
  },
  {
    path: '/specification/add', element: <AddSpecification/>
  }
]

export default specificationRoutes