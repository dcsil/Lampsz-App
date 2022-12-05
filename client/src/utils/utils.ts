import { FormFieldEvent, NavItem, SetState, UserType } from './types'
import Cookies from 'js-cookie'

export const containerStyle = {
  contentBox: {
    display: 'flex',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  centeredBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  centeredPaper: {
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  contentContainer: {
    mt: 6,
    mb: 6
  }
}

/**
 * Return { name, href } NavItem list given user type
 *
 * @param userType
 */
export const getNavItems = (userType: UserType): NavItem[] => {
  switch (userType) {
    case UserType.NONE:
      return [
        { name: 'Home', href: '/' },
        { name: 'Login', href: '/login' },
        { name: 'Register', href: '/signup' }
      ]
    case UserType.BUSINESS:
      return [
        { name: 'Home', href: '/' },
        { name: 'Marketplace', href: '/marketplace' },
        { name: 'My Marketing Tasks', href: '/tasks' }
      ]
    case UserType.INFLUENCER:
      return [
        { name: 'Home', href: '/' },
        { name: 'Marketplace', href: '/marketplace' },
        { name: 'My Applications', href: '/applications' }
      ]
  }
}

export const isAuthenticated = (userType: UserType): boolean => {
  return userType !== UserType.NONE
}

/**
 * Utility function to determine whether there is error or not.
 */
export const hasError = (error: string): boolean => error !== ''

/**
 * Converts ISO string date to date in yyyy-mm-dd format.
 */
export const isoToDate = (isoString: string): string => {
  return isoString.slice(0, 10).toString()
}

export const getRequestConfig = (): any => {
  return {
    headers: {
      'X-CSRFTOKEN': Cookies.get('csrftoken')
    }
  }
}
