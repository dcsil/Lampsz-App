import { AuthResponse, CSetState, ErrorData, RegisterValidation, SetState, UserType } from '../utils/types'
import axios, { AxiosError, AxiosResponse } from 'axios'

// Constants
const confirmPassFails = 'Password don\'t match'

/**
 * Gets one-time CSRF token from API server
 *
 * @param setCsrf set state function for CSRF token.
 */
const getCSRF = (setCsrf: SetState<string>): void => {
  axios
    .get('/api/csrf/')
    .then((response: AxiosResponse) => setCsrf(response.headers['x-csrftoken']!))
    .catch((error: AxiosError) => console.log(error))
}

/**
 * Check user session status from API server.
 *
 * @param setCsrf set state function for CSRF token.
 */
export const checkSession = (
  setCsrf: SetState<string>,
  setUsername: SetState<string>,
  setUserType: SetState<UserType>,
  setUserId: SetState<string>,
  setIsReadingCookie: SetState<boolean>
): void => {
  axios
    .get('/api/session/')
    .then((response: AxiosResponse<AuthResponse>) => {
      if (response.data.userType === UserType.NONE) {
        getCSRF(setCsrf)
      }
      setUserType(response.data.userType)
      setUserId(response.data.userId)
      setUsername(response.data.username)
      setIsReadingCookie(false)
    })
    .catch(_ => {
      setIsReadingCookie(false)
    })
}

/**
 * Authenticate user by calling API server.
 *
 * @param username user inputted username.
 * @param password user inputted password.
 * @param setError set state function for error message from API server.
 */
export const businessLogin = (
  username: string,
  password: string,
  setError: SetState<string>,
  setUsername: SetState<string>,
  setUserType: SetState<UserType>,
  setUserId: SetState<string>,
  setIsReadingCookie: SetState<boolean>
): void => {
  axios
    .post('/api/company_login/', { username, password })
    .then((response: AxiosResponse<AuthResponse>) => {
      setUserType(response.data.userType)
      setUserId(response.data.userId)
      setUsername(response.data.username)
      setIsReadingCookie(false)
    })
    .catch((error: AxiosError<ErrorData>) => {
      setError(error.response!.data.message)
      setIsReadingCookie(false)
    })
}

/**
 * Register user by calling API server.
 *
 * @param username user inputted username.
 * @param email user inputted email.
 * @param password user inputted password.
 * @param confPassword user inputted confirm password.
 * @param setError set state function for error message from API server.
 */
export const businessRegister = (
  username: string,
  email: string,
  password: string,
  confPassword: string,
  setError: SetState<string>,
  setUsername: SetState<string>,
  setUserType: SetState<UserType>,
  setUserId: SetState<string>,
  setIsReadingCookie: SetState<boolean>
): void => {
  // Check two passwords match
  if (password !== confPassword) {
    setError(confirmPassFails)
    return
  }

  axios
    .post('/api/company_register/', { email, username, password })
    .then((response: AxiosResponse<AuthResponse>) => {
      setUserType(response.data.userType)
      setUserId(response.data.userId)
      setUsername(response.data.username)
      setIsReadingCookie(false)
    })
    .catch((error: AxiosError<RegisterValidation>) => {
      if (error.response!.data.username !== undefined) {
        setError(error.response!.data.username.join('\n'))
      } else if (error.response!.data.email !== undefined) {
        setError(error.response!.data.email.join('\n'))
      }
      setIsReadingCookie(false)
    })
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
export const logout = (setUserType: SetState<UserType>, setCsrf: SetState<string>): void => {
  axios
    .get('/api/logout/')
    .then(() => {
      setUserType(UserType.NONE)
      getCSRF(setCsrf)
    })
    .catch(error => console.log(error))
}
