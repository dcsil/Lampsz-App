import { SetState, UserType } from '../utils/types'
import * as React from 'react'
import { businessLogin, businessRegister, checkSession } from '../actions/auth'

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
  login: (loginUsername: string, password: string, setError: SetState<string>) => void
  register: (newUsername: string, email: string, password: string, confPassword: string, setError: SetState<string>) => void
  session: VoidFunction
}

const AuthContext = React.createContext<AuthContextType>(null!)

export function AuthProvider ({ children }: { children: React.ReactNode }): JSX.Element {
  const [username, setUsername] = React.useState<string>('')
  const [userType, setUserType] = React.useState<UserType>(UserType.NONE)
  const [userId, setUserId] = React.useState<string>('')
  const [csrf, setCsrf] = React.useState<string>('')
  const [isReadingCookie, setIsReadingCookie] = React.useState<boolean>(true)

  const login = (loginUsername: string, password: string, setError: SetState<string>): void => {
    businessLogin(loginUsername, password, setError, setUsername, setUserType, setUserId, setIsReadingCookie)
  }

  const register = (
    newUsername: string,
    email: string,
    password: string,
    confPassword: string,
    setError: SetState<string>
  ): void => {
    businessRegister(newUsername, email, password, confPassword, setError, setUsername, setUserType, setUserId, setIsReadingCookie)
  }

  const session = (): void => {
    checkSession(setCsrf, setUsername, setUserType, setUserId, setIsReadingCookie)
  }

  const states = { username, userType, userId, csrf, isReadingCookie }
  const setStates = { setCsrf, setUserType }
  const custom = { login, register, session }
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
