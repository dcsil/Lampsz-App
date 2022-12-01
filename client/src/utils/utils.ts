import { FormFieldEvent, NavItem, SetState, UserType } from './types'

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
 * Returns a functions that handles form field value change.
 *
 * @param setField state update function for form field.
 * @param setError state update function for error message.
 */
export const formFieldOnChange = (
  setField: SetState<string>,
  setError: SetState<string>
): (event: FormFieldEvent) => void => {
  return (event) => {
    setError('')
    setField(event.target.value)
  }
}

/**
 * Utility function to determine whether there is error or not.
 */
export const hasError = (error: string): boolean => error !== ''

export const getCookie = (name: string): string | null => {
  let cookieValue = null
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}
