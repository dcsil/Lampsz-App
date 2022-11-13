import { SetState, UserType } from './types'

export interface AuthProps {
  auth: boolean
  userType: UserType
  setAuth: SetState<boolean>
  setUserType: SetState<UserType>
}
