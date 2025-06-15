import ListOrder from "../pages/Order";
import DetailOrder from "../pages/Order/DetailOrder";

const orderRoutes = [
  {
    path: '/order', element: <ListOrder/>
  }, {
    path: '/order/:id', element: <DetailOrder/>
  }
]

export default orderRoutes