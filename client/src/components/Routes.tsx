import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import Login from './Login';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  }
]);

export default function Router() {
  return <RouterProvider router={router}/>;
}
