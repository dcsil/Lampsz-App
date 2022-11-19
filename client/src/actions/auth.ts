import { CSetState, ErrorData, RegisterValidation, SetState, UserType } from '../utils/types'
import axios, { AxiosError, AxiosResponse } from 'axios'

// Constants
const confirmPassFails = 'Password don\'t match'

const getCSRF = (setCsrf: any): void => {
  axios
    .get('/api/csrf/')
    .then((response: AxiosResponse) => {
      console.log(response.headers)
      const csrfToken = response.headers['x-csrftoken']
      console.log(csrfToken)
      setCsrf(csrfToken)
    })
    .catch((error: AxiosError) => console.log(error))
}

export const checkSession = (setUserType: CSetState<UserType>, setCsrf: CSetState<string>): void => {
  axios
    .get('/api/session/')
    .then((response: AxiosResponse) => {
      console.log(response)
      setUserType(response.data.userType)
      if (response.data.userType === UserType.NONE) {
        getCSRF(setCsrf)
      }
    })
    .catch((error: AxiosError) => console.log(error))
}

export const businessLogin = (username: string, password: string, csrf: string, setError: SetState<string>, setUserType: CSetState<UserType>): void => {
  axios
    .post('/api/company_login/', {
      username,
      password,
      userType: UserType.BUSINESS
    }, {
      headers: {
        'X-CSRFToken': csrf
      }
    })
    .then((response: AxiosResponse) => {
      console.log(response)
      setUserType(UserType.BUSINESS)
    })
    .catch((error: AxiosError<ErrorData>) => {
      console.log(error)
      setError(error.response!.data.message)
    })
}

export const businessRegister = (
  username: string,
  email: string,
  password: string,
  confPassword: string,
  setError: SetState<string>,
  setUserType: CSetState<UserType>
): void => {
  // Check two passwords match
  if (password !== confPassword) {
    setError(confirmPassFails)
    return
  }

  axios
    .post('/api/company_register/', {
      email, username, password
    })
    .then(() => {
      setUserType(UserType.BUSINESS)
    })
    .catch((error: AxiosError<RegisterValidation>) => {
      console.log(error)
      setError(error.response!.data.username!.join('\n'))
    })
}

export const influencerLogin = (setUserType: CSetState<UserType>): void => {
}

export const influencerRegister = (setUserType: CSetState<UserType>): void => {
}

export const logout = (setUserType: CSetState<UserType>, setCsrf: CSetState<string>): void => {
  axios
    .get('/api/logout/')
    .then(() => {
      setUserType(UserType.NONE)
      getCSRF(setCsrf)
    })
    .catch(error => console.log(error))
}
