import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Dashboard from "../pages/Dashboard";
import categoryRoutes from "./category.routes";
import productRoutes from "./product.routes";
import colorRoutes from "./color.routes";


const router = createBrowserRouter([
  {
    path: '/', element: <Layout/>,
    children: [
      {
        index: true, element: <Dashboard/>
      }, 
      ...categoryRoutes,
      ...productRoutes,
      ...colorRoutes
    ]
  }
])

export default router