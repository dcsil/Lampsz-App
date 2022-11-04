import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
]);

export default function Router() {
  return <RouterProvider router={router}/>;
}
