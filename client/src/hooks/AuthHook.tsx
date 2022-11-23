import { AuthCallback, SetState, UserType } from '../utils/types'
import * as React from 'react'
import { businessLoginAction, businessRegisterAction, checkSession, logoutAction } from '../actions/auth'

export interface AuthContextType {
  // States
  username: string
  userType: UserType
  userId: string
  csrf: string
  isReadingCookie: boolean
  // Set states functions
  setCsrf: SetState<string>
  setUserType: SetState<UserType>
  // Custom functions
  businessLogin: (loginUsername: string, password: string, setError: SetState<string>, callback: VoidFunction) => void
  businessRegister: (
    newUsername: string,
    email: string,
    password: string,
    confPassword: string,
    setError: SetState<string>,
    callback: VoidFunction
  ) => void
  session: VoidFunction
  logout: (callback: VoidFunction) => void
}

const AuthContext = React.createContext<AuthContextType>(null!)

export function AuthProvider ({ children }: { children: React.ReactNode }): JSX.Element {
  const [username, setUsername] = React.useState<string>('')
  const [userType, setUserType] = React.useState<UserType>(UserType.NONE)
  const [userId, setUserId] = React.useState<string>('')
  const [csrf, setCsrf] = React.useState<string>('')
  const [isReadingCookie, setIsReadingCookie] = React.useState<boolean>(true)

  /**
   * Create a callback function for successful authentication that updates common states.
   *
   * @param callback callback called after success API server call (e.g., use for navigation).
   */
  const createAuthCallback = (callback?: VoidFunction): AuthCallback => {
    return (username: string, userId: string, userType: UserType): void => {
      setUsername(username)
      setUserId(userId)
      setUserType(userType)
      setIsReadingCookie(false)
      if (callback) {
        callback()
      }
    }
  }

  /**
   * Wrapper around business login API server call that automatically updates
   * authenticated user data.
   *
   * @param loginUsername user inputted username.
   * @param password user inputted password.
   * @param setError set state function for error message from API server.
   * @param callback callback called after success API server call (e.g., use for navigation).
   */
  const businessLogin = (loginUsername: string, password: string, setError: SetState<string>, callback: VoidFunction): void => {
    businessLoginAction(loginUsername, password, setError, createAuthCallback(callback))
  }

  /**
   * Wrapper around business login API server call that automatically updates
   * authenticated user data.
   *
   * @param newUsername user inputted new username.
   * @param email user inputted email for new account.
   * @param password user inputted new password.
   * @param confPassword user inputted confirm password.
   * @param setError set state function for error message from API server.
   * @param callback callback called after success API server call (e.g., use for navigation).
   */
  const businessRegister = (
    newUsername: string,
    email: string,
    password: string,
    confPassword: string,
    setError: SetState<string>,
    callback: VoidFunction
  ): void => {
    businessRegisterAction(newUsername, email, password, confPassword, setError, createAuthCallback(callback))
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
    logoutAction(setCsrf, () => {
      setUserType(UserType.NONE)
      setUserId('')
      setUsername('')
      callback()
    })
  }

  // APIs provided by the hook
  const states = { username, userType, userId, csrf, isReadingCookie }
  const setStates = { setCsrf, setUserType }
  const custom = { businessLogin, businessRegister, session, logout }
  const value = { ...states, ...setStates, ...custom }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth (): AuthContextType {
  return React.useContext(AuthContext)
}
