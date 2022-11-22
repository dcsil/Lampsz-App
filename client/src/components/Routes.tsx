import * as React from 'react'
import { createBrowserRouter, Navigate, RouterProvider, useLocation } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Marketplace from './Marketplace'
import Profile from './Profile'
import MarketingTaskDetail from './MarketingTaskDetail'
import MyApplications from './MyApplications'
import MyMarketingTasks from './MyMarketingTasks'
import { isAuthenticated } from '../utils/utils'
import { CommonProps, UserType } from '../utils/types'

/**
 * Gates given child component by redirecting unauthenticated or unauthorized
 * users to login or home page respectively.
 *
 * @param children the child component to render.
 * @param currUserType the current user type that is logged in.
 * @param reqUserType the required user type to access the page.
 */
function RequireAuth (
  {
    children,
    currUserType,
    reqUserType
  }: {
    children: JSX.Element
    currUserType: UserType
    reqUserType?: UserType
  }
): JSX.Element {
  const location = useLocation()

  if (!isAuthenticated(currUserType)) {
    return <Navigate to="/login" state={{ from: location }} replace/>
  }
  return (reqUserType === undefined || reqUserType === currUserType)
    ? children
    : <Navigate to="/" replace/>
}

/**
 * Gates authentication pages by redirecting authenticated users to home page
 * when they try to access authentication pages.
 *
 * @param children the child component to render.
 * @param userType the current user type.
 */
function AuthRoutes ({ children, userType }: { children: JSX.Element, userType: UserType }): JSX.Element {
  if (isAuthenticated(userType)) {
    return <Navigate to="/" replace/>
  }
  return children
}

export default function Router (props: CommonProps): JSX.Element {
  const router = createBrowserRouter([
    { path: '/', element: <Home {...props}/> },
    {
      path: '/login',
      element: (
        <AuthRoutes userType={props.userType}>
          <Login {...props}/>
        </AuthRoutes>
      )
    },
    {
      path: '/signup',
      element: (
        <AuthRoutes userType={props.userType}>
          <Signup {...props}/>
        </AuthRoutes>
      )
    },
    {
      path: '/marketplace',
      element: (
        <RequireAuth currUserType={props.userType}>
          <Marketplace/>
        </RequireAuth>
      )
    },
    {
      path: '/marketplace/:taskId',
      element: (
        <RequireAuth currUserType={props.userType}>
          <MarketingTaskDetail/>
        </RequireAuth>
      )
    },
    {
      path: '/profile',
      element: (
        <RequireAuth currUserType={props.userType}>
          <Profile {...props}/>
        </RequireAuth>
      )
    },
    {
      path: '/applications',
      element: (
        <RequireAuth currUserType={props.userType} reqUserType={UserType.INFLUENCER}>
          <MyApplications/>
        </RequireAuth>
      )
    },
    {
      path: '/tasks',
      element: (
        <RequireAuth currUserType={props.userType} reqUserType={UserType.BUSINESS}>
          <MyMarketingTasks/>
        </RequireAuth>
      )
    }
  ])

  return <RouterProvider router={router}/>
}
