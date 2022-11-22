import { CSetState, UserType } from './types'
import App from '../App'

export interface AuthProps {
  userType: UserType
  setUserType: CSetState<UserType>
  csrf: string
  setCsrf: CSetState<string>
}

export interface CommonProps {
  userType: UserType
  username: string
  userId: string
  appComponent: App
}
