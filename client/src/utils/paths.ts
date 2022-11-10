import { NavItem, UserType } from './types'

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
        { name: 'Your Marketing Tasks', href: '/' }
      ]
    case UserType.INFLUENCER:
      return [
        { name: 'Home', href: '/' },
        { name: 'Marketplace', href: '/marketplace' },
        { name: 'Your Applications', href: '/' }
      ]
  }
}
