import * as React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import { AuthProps } from '../utils/sharedProps'
import Marketplace from '../pages/Marketplace'
import Profile from '../pages/Profile'
import MarketingTaskDetail from '../pages/MarketingTaskDetail'
import MyApplications from '../pages/MyApplications'
import MyMarketingTasks from '../pages/MyMarketingTasks'

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
    },
    {
      path: '/marketplace',
      element: <Marketplace/>
    },
    {
      path: '/marketplace/:taskId',
      element: <MarketingTaskDetail/>
    },
    {
      path: '/profile',
      element: <Profile {...props}/>
    },
    {
      path: '/applications',
      element: <MyApplications/>
    },
    {
      path: '/tasks',
      element: <MyMarketingTasks/>
    }
  ])

  return <RouterProvider router={router}/>
}
