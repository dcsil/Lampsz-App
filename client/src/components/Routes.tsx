import * as React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import { AuthProps } from '../utils/sharedProps'
import Marketplace from './Marketplace'
import Profile from './Profile'
import MarketingTaskDetail from './MarketingTaskDetail'
import MyApplications from './MyApplications'
import MyMarketingTasks from './MyMarketingTasks'

export default function Router (props: AuthProps): JSX.Element {
  const router = createBrowserRouter([
    { path: '/', element: <Home {...props}/> },
    { path: '/login', element: <Login {...props}/> },
    { path: '/signup', element: <Signup {...props}/> },
    { path: '/marketplace', element: <Marketplace/> },
    { path: '/marketplace/:taskId', element: <MarketingTaskDetail/> },
    { path: '/profile', element: <Profile {...props}/> },
    { path: '/applications', element: <MyApplications/> },
    { path: '/tasks', element: <MyMarketingTasks/> }
  ])

  return <RouterProvider router={router}/>
}
