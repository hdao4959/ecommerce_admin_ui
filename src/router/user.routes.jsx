import ListUser from "../pages/User";
import AddUser from "../pages/User/AddUser";

const userRoutes = [
  {
    path: 'user', element: <ListUser/>
  },
  {
    path: 'user/add', element: <AddUser/>
  }
]

export default userRoutes