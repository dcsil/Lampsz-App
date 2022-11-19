import { CSetState, ErrorData, RegisterValidation, SetState, UserType } from '../utils/types'
import axios, { AxiosError, AxiosResponse } from 'axios'

// Constants
const confirmPassFails = 'Password don\'t match'

/**
 * Gets one-time CSRF token from API server
 *
 * @param setCsrf set state function for CSRF token.
 */
const getCSRF = (setCsrf: any): void => {
  axios
    .get('/api/csrf/')
    .then((response: AxiosResponse) => setCsrf(response.headers['x-csrftoken']))
    .catch((error: AxiosError) => console.log(error))
}

/**
 * Check user session status from API server.
 *
 * @param setUserType set state function for user type.
 * @param setCsrf set state function for CSRF token.
 */
export const checkSession = (setUserType: CSetState<UserType>, setCsrf: CSetState<string>): void => {
  axios
    .get('/api/session/')
    .then((response: AxiosResponse) => {
      setUserType(response.data.userType)
      if (response.data.userType === UserType.NONE) {
        getCSRF(setCsrf)
      }
    })
    .catch((error: AxiosError) => console.log(error))
}

/**
 * Authenticate user by calling API server.
 *
 * @param username user inputted username.
 * @param password user inputted password.
 * @param setError set state function for error message from API server.
 * @param setUserType set state function for user type.
 */
export const businessLogin = (username: string, password: string, setError: SetState<string>, setUserType: CSetState<UserType>): void => {
  axios
    .post('/api/company_login/', {
      username,
      password,
      userType: UserType.BUSINESS
    })
    .then(_ => setUserType(UserType.BUSINESS))
    .catch((error: AxiosError<ErrorData>) => setError(error.response!.data.message))
}

/**
 * Register user by calling API server.
 *
 * @param username user inputted username.
 * @param email user inputted email.
 * @param password user inputted password.
 * @param confPassword user inputted confirm password.
 * @param setError set state function for error message from API server.
 * @param setUserType set state function for user type.
 */
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
      email,
      username,
      password
    })
    .then(_ => setUserType(UserType.BUSINESS))
    .catch((error: AxiosError<RegisterValidation>) => setError(error.response!.data.username!.join('\n')))
}

export const influencerLogin = (setUserType: CSetState<UserType>): void => {
}

export const influencerRegister = (setUserType: CSetState<UserType>): void => {
}

/**
 * Logout user by calling API server
 *
 * @param setUserType set state function for user type.
 * @param setCsrf set state function for CSRF token.
 */
export const logout = (setUserType: CSetState<UserType>, setCsrf: CSetState<string>): void => {
  axios
    .get('/api/logout/')
    .then(() => {
      setUserType(UserType.NONE)
      getCSRF(setCsrf)
    })
    .catch(error => console.log(error))
}
