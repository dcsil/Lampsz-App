import { AuthCallback, SetState, UserType } from '../utils/types'
import * as React from 'react'
import { checkSession, loginAction, logoutAction, registerAction, RegisterInfo } from '../actions/auth'

interface AuthContextType {
  // States
  displayName: string
  userType: UserType
  userId: number
  csrf: string
  isReadingCookie: boolean
  // Set states functions
  setCsrf: SetState<string>
  setUserType: SetState<UserType>
  // Custom functions
  login: (loginUsername: string, password: string, setError: SetState<string>, callback: VoidFunction) => void
  register: (info: RegisterInfo, setError: SetState<string>, callback: VoidFunction) => void
  session: VoidFunction
  logout: (callback: VoidFunction) => void
}

const AuthContext = React.createContext<AuthContextType>(null!)

export function AuthProvider ({ children }: { children: React.ReactNode }): JSX.Element {
  const [displayName, setDisplayName] = React.useState<string>('')
  const [userType, setUserType] = React.useState<UserType>(UserType.NONE)
  const [userId, setUserId] = React.useState<number>(-1)
  const [csrf, setCsrf] = React.useState<string>('')
  const [isReadingCookie, setIsReadingCookie] = React.useState<boolean>(true)

  /**
   * Create a callback function for successful authentication that updates common states.
   *
   * @param callback callback called after success API server call (e.g., use for navigation).
   */
  const createAuthCallback = (callback?: VoidFunction): AuthCallback => {
    return (hasError: boolean, _displayName?: string, _userId?: number, _userType?: UserType): void => {
      setDisplayName(_displayName ?? '')
      setUserId(_userId ?? -1)
      setUserType(_userType ?? UserType.NONE)
      setIsReadingCookie(false)
      if (callback && !hasError) {
        callback()
      }
    }
  }

  /**
   * Wrapper around login API server call that automatically updates
   * authenticated user data.
   *
   * @param loginUsername user inputted username.
   * @param password user inputted password.
   * @param setError set state function for error message from API server.
   * @param callback callback called after success API server call (e.g., use for navigation).
   */
  const login = (loginUsername: string, password: string, setError: SetState<string>, callback: VoidFunction): void => {
    loginAction(loginUsername, password, setError, createAuthCallback(callback))
  }

  /**
   * Wrapper around register API server call that automatically updates
   * authenticated user data.
   *
   * @param info object containing all the info needed to register new user.
   * @param setError set state function for error message from API server.
   * @param callback callback called after success API server call (e.g., use for navigation).
   */
  const register = (info: RegisterInfo, setError: SetState<string>, callback: VoidFunction): void => {
    registerAction(info, setError, createAuthCallback(callback))
  }

  /**
   * Wrapper around check session API server call that automatically updates
   * authenticated user data.
   */
  const session = (): void => {
    checkSession(setCsrf, createAuthCallback())
  }

  /**
   * Wrapper around user logout API server call that automatically updates
   * authenticated user data.
   *
   * @param callback callback called after success API server call (e.g., use for navigation).
   */
  const logout = (callback: VoidFunction): void => {
    logoutAction(setCsrf, createAuthCallback(callback))
  }

  // APIs provided by the hook
  const states = { displayName, userType, userId, csrf, isReadingCookie }
  const setStates = { setCsrf, setUserType }
  const custom = { login, register, session, logout }
  const value = { ...states, ...setStates, ...custom }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth (): AuthContextType {
  return React.useContext(AuthContext)
}
