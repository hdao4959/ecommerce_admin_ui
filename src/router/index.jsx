import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Dashboard from "../pages/Dashboard";
import categoryRoutes from "./category.routes";
import productRoutes from "./product.routes";
import colorRoutes from "./color.routes";
import variantRoutes from "./variant.routes";


const router = createBrowserRouter([
  {
    path: '/', element: <Layout/>,
    children: [
      {
        index: true, element: <Dashboard/>
      }, 
      ...categoryRoutes,
      ...productRoutes,
      ...colorRoutes,
      ...variantRoutes
    ]
  }
])

export default router