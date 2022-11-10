import * as React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

interface RouteProps {
  auth: boolean
  setAuth: (a: boolean) => void
}

export default function Router ({ auth, setAuth }: RouteProps): JSX.Element {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/signup',
      element: <Signup/>
    }
  ])

  return <RouterProvider router={router}/>
}
