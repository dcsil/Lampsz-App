import { AuthCallback, AuthResponse, ErrorData, RegisterValidation, SetState, UserType } from '../utils/types'
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
 * @param callback
 */
export const checkSession = (
  setCsrf: SetState<string>,
  callback: AuthCallback
): void => {
  axios
    .get('/api/session/')
    .then((response: AxiosResponse<AuthResponse>) => {
      if (response.data.userType === UserType.NONE) {
        getCSRF(setCsrf)
      }
      callback(response.data.username, response.data.userId, response.data.userType)
    })
    .catch(_ => {
      callback('', '', UserType.NONE)
    })
}

/**
 * Authenticate user by calling API server.
 *
 * @param username user inputted username.
 * @param password user inputted password.
 * @param setError set state function for error message from API server.
 * @param callback
 */
export const businessLoginAction = (
  username: string,
  password: string,
  setError: SetState<string>,
  callback: AuthCallback
): void => {
  axios
    .post('/api/company_login/', { username, password })
    .then((response: AxiosResponse<AuthResponse>) => {
      callback(response.data.username, response.data.userId, response.data.userType)
    })
    .catch((error: AxiosError<ErrorData>) => {
      setError(error.response!.data.message)
      callback('', '', UserType.NONE)
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
 * @param callback
 */
export const businessRegisterAction = (
  username: string,
  email: string,
  password: string,
  confPassword: string,
  setError: SetState<string>,
  callback: AuthCallback
): void => {
  // Check two passwords match
  if (password !== confPassword) {
    setError(confirmPassFails)
    return
  }

  axios
    .post('/api/company_register/', { email, username, password })
    .then((response: AxiosResponse<AuthResponse>) => {
      callback(response.data.username, response.data.userId, response.data.userType)
    })
    .catch((error: AxiosError<RegisterValidation>) => {
      if (error.response!.data.username !== undefined) {
        setError(error.response!.data.username.join('\n'))
      } else if (error.response!.data.email !== undefined) {
        setError(error.response!.data.email.join('\n'))
      }
      callback('', '', UserType.NONE)
    })
}

export const influencerLogin = (setUserType: SetState<UserType>): void => {
}

export const influencerRegister = (setUserType: SetState<UserType>): void => {
}

/**
 * Logout user by calling API server
 *
 * @param setCsrf set state function for CSRF token.
 * @param callback
 */
export const logoutAction = (setCsrf: SetState<string>, callback: VoidFunction): void => {
  axios
    .get('/api/logout/')
    .then(() => {
      getCSRF(setCsrf)
      callback()
    })
    .catch(error => console.log(error))
}
