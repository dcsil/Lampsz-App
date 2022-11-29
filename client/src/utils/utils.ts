import { NavItem, SetState, UserType } from './types'
import * as React from 'react'

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
  contentPaper: {
    p: 2,
    display: 'flex',
    flexDirection: 'column'
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
 * Handles form field value change.
 *
 * @param event form field value change event.
 * @param setField state update function for form field.
 * @param setError state update function for error message.
 */
export const formFieldOnChange = (
  event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  setField: SetState<string>,
  setError: SetState<string>
): void => {
  setError('')
  setField(event.target.value)
}

/**
 * Utility function to determine whether there is error or not.
 */
export const hasError = (error: string): boolean => error !== ''

/**
 * Utility function that redirect user to Google OAuth page.
 */
export const handleGoogleSync = (): void => {
  (window as Window).location = `${window.location.origin}/api/authorize/`
}
