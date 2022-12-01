import { AuthCallback, AuthResponse, ErrorData, RegisterValidation, SetState, UserType } from '../utils/types'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { AlertColor } from '@mui/material/Alert'

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
      callback(response.data.username, response.data.userId, response.data.userType, true)
    })
    .catch(_ => {
      callback('', '', UserType.NONE, false)
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
export const loginAction = (
  username: string,
  password: string,
  setError: SetState<string>,
  callback: AuthCallback
): void => {
  axios
    .post('/api/login/', { username, password })
    .then((response: AxiosResponse<AuthResponse>) => {
      callback(response.data.username, response.data.userId, response.data.userType, false)
    })
    .catch((error: AxiosError<ErrorData>) => {
      setError(error.response!.data.message)
      callback('', '', UserType.NONE, true)
    })
}

/**
 * Register user by calling API server.
 *
 * @param username user inputted username.
 * @param email user inputted email.
 * @param password user inputted password.
 * @param confPassword user inputted confirm password.
 * @param userType the type of user registering.
 * @param setError set state function for error message from API server.
 * @param callback
 */
export const registerAction = (
  username: string,
  email: string,
  password: string,
  confPassword: string,
  userType: UserType,
  setError: SetState<string>,
  callback: AuthCallback
): void => {
  // Check two passwords match
  if (password !== confPassword) {
    setError(confirmPassFails)
    return
  }

  axios
    .post('/api/register/', { email, username, password, is_influencer: userType === UserType.INFLUENCER })
    .then((response: AxiosResponse<AuthResponse>) => {
      callback(response.data.username, response.data.userId, response.data.userType, false)
    })
    .catch((error: AxiosError<RegisterValidation>) => {
      if (error.response!.data.username !== undefined) {
        setError(error.response!.data.username.join('\n'))
      } else if (error.response!.data.email !== undefined) {
        setError(error.response!.data.email.join('\n'))
      }
      callback('', '', UserType.NONE, true)
    })
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

/**
 *
 * @param setMessage
 * @param setLevel
 * @param setOpen
 */
export const getMessages = (setMessage: SetState<string>, setLevel: SetState<AlertColor>, setOpen: SetState<boolean>): void => {
  axios
    .get('/api/messages/')
    .then((response: AxiosResponse) => {
      const messages = response.data.messages
      if (messages.length !== 0) {
        setMessage(messages[0].message)
        setLevel(messages[0].level)
        setOpen(true)
      }
    })
    .catch((error: AxiosResponse) => console.log(error))
}
