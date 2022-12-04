import * as React from 'react'
import { useEffect } from 'react'
import { createBrowserRouter, Navigate, redirect, RouterProvider, useLocation } from 'react-router-dom'
import Home from './Home'
import Marketplace from './Marketplace'
import Profile from './Profile'
import MarketingTaskDetail from './MarketingTaskDetail'
import MyApplications from './MyApplications'
import MyMarketingTasks from './MyMarketingTasks'
import { isAuthenticated } from '../utils/utils'
import { UserType } from '../utils/types'
import useAuth from '../hooks/AuthHook'
import Loading from './Loading'
import Nav from './Nav'
import BusinessSignup from './Auth/BusinessSignup'
import InfluencerAuthTab from './Auth/InfluencerAuthTab'
import AuthTabs from './Auth/AuthTabs'
import BusinessLogin from './Auth/BusinessLogin'
import { getMarketingTaskData } from '../actions/marketingTask'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <NavWrapper>
        <Home/>
      </NavWrapper>
    )
  },
  {
    path: '/login',
    element: (
      <AuthRoutes>
        <AuthTabs
          businessComp={<BusinessLogin/>}
          influencerComp={<InfluencerAuthTab label="Google Login"/>}
        />
      </AuthRoutes>
    )
  },
  {
    path: '/signup',
    element: (
      <AuthRoutes>
        <AuthTabs
          businessComp={<BusinessSignup/>}
          influencerComp={<InfluencerAuthTab label="Sync with Google"/>}
        />
      </AuthRoutes>
    )
  },
  {
    path: '/marketplace',
    element: (
      <RequireAuth>
        <Marketplace/>
      </RequireAuth>
    )
  },
  {
    path: '/tasks/:taskId',
    element: (
      <RequireAuth>
        <MarketingTaskDetail/>
      </RequireAuth>
    ),
    loader: async ({ params }) => {
      try {
        return await getMarketingTaskData(params.taskId!)
      } catch (_) {
        return redirect('/')
      }
    }
  },
  {
    path: '/profile/:userId',
    element: (
      <RequireAuth>
        <Profile/>
      </RequireAuth>
    )
  },
  {
    path: '/applications',
    element: (
      <RequireAuth reqUserType={UserType.INFLUENCER}>
        <MyApplications/>
      </RequireAuth>
    )
  },
  {
    path: '/tasks',
    element: (
      <RequireAuth reqUserType={UserType.BUSINESS}>
        <MyMarketingTasks/>
      </RequireAuth>
    )
  }
])

export default function Router (): JSX.Element {
  const auth = useAuth()

  useEffect(() => {
    auth.session()
  }, [])

  return auth.isReadingCookie ? <Loading/> : <RouterProvider router={router}/>
}

/**
 * Simple wrapper components that adds Nav bar on top.
 *
 * @param children the child component to render.
 */
function NavWrapper ({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <React.Fragment>
      <Nav/>
      {children}
    </React.Fragment>
  )
}

/**
 * Gates given child component by redirecting unauthenticated or unauthorized
 * users to login or home page respectively.
 *
 * @param children the child component to render.
 * @param currUserType the current user type that is logged in.
 * @param reqUserType the required user type to access the page.
 */
function RequireAuth ({ children, reqUserType }: { children: JSX.Element, reqUserType?: UserType }): JSX.Element {
  const location = useLocation()
  const auth = useAuth()

  if (!isAuthenticated(auth.userType)) {
    return <Navigate to="/login" state={{ from: location }} replace/>
  }
  return (reqUserType === undefined || reqUserType === auth.userType)
    ? <NavWrapper>{children}</NavWrapper>
    : <Navigate to="/" replace/>
}

/**
 * Gates authentication pages by redirecting authenticated users to home page
 * when they try to access authentication pages.
 *
 * @param children the child component to render.
 * @param userType the current user type.
 */
function AuthRoutes ({ children }: { children: JSX.Element }): JSX.Element {
  const auth = useAuth()
  if (isAuthenticated(auth.userType)) {
    return <Navigate to="/" replace/>
  }
  return <NavWrapper>{children}</NavWrapper>
}
