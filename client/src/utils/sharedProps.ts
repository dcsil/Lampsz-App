import { CSetState, UserType } from './types'

export interface AuthProps {
  userType: UserType
  setUserType: CSetState<UserType>
  csrf: string
  setCsrf: CSetState<string>
}

export interface CommonProps {
  userType: UserType
  setUserType: CSetState<UserType>
  username: string
  userId: number
}
