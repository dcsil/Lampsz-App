import * as React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import { AuthProps } from '../utils/sharedProps'

export default function Router (props: AuthProps): JSX.Element {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home {...props}/>
    },
    {
      path: '/login',
      element: <Login {...props}/>
    },
    {
      path: '/signup',
      element: <Signup {...props}/>
    }
  ])

  return <RouterProvider router={router}/>
}
