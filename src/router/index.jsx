import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import categoryRoutes from "./category.routes";
import productRoutes from "./product.routes";
import colorRoutes from "./color.routes";
import variantRoutes from "./variant.routes";
import orderRoutes from "./order.routes";
import userRoutes from "./user.routes";
import specificationRoutes from "./specification.routes";
import BlankLayout from "../Layouts/BlankLayout";
import Login from "../pages/Auth/Login";


const router = createBrowserRouter([
  {
    element: <MainLayout/>,
    children: [
      {
        index: true, element: <Dashboard/>
      }, 
      ...categoryRoutes,
      ...productRoutes,
      ...colorRoutes,
      ...variantRoutes,
      ...orderRoutes, 
      ...userRoutes, 
      ...specificationRoutes
    ]
  }, 
  {
    path: "/login", element: <Login/>
  },{
    path: "/register", element: <Login/>
  }
])

export default router