import { AuthCallback, AuthResponse, ErrorData, RegisterValidation, SetState } from '../utils/types'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { AlertColor } from '@mui/material/Alert'

// Constants
const confirmPassFails = 'Password don\'t match'

// Interfaces
export interface RegisterInfo {
  username: string
  companyName: string
  email: string
  password: string
  confirmPassword: string
  isInfluencer: boolean
}

/**
 * Check user session status from API server.
 *
 * @param setCsrf set state function for CSRF token.
 * @param callback
 */
export const checkSession = (setCsrf: SetState<string>, callback: AuthCallback): void => {
  axios
    .get('/api/session/')
    .then(successAuthResponse(callback))
    .catch(_ => callback(true))
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
    .then(successAuthResponse(callback))
    .catch((error: AxiosError<ErrorData>) => {
      setError(error.response!.data.message)
      callback(true)
    })
}

/**
 * Register user by calling API server.
 *
 * @param info object containing all the info needed to register new user.
 * @param setError set state function for error message from API server.
 * @param callback
 */
export const registerAction = (info: RegisterInfo, setError: SetState<string>, callback: AuthCallback): void => {
  // Check two passwords match
  if (info.password !== info.confirmPassword) {
    setError(confirmPassFails)
    return
  }

  axios
    .post('/api/register/', info)
    .then(successAuthResponse(callback))
    .catch((error: AxiosError<RegisterValidation>) => {
      if (error.response!.data.username !== undefined) {
        setError(error.response!.data.username.join('\n'))
      } else if (error.response!.data.email !== undefined) {
        setError(error.response!.data.email.join('\n'))
      }
      callback(true)
    })
}

/**
 * Logout user by calling API server
 *
 * @param setCsrf set state function for CSRF token.
 * @param callback
 */
export const logoutAction = (setCsrf: SetState<string>, callback: AuthCallback): void => {
  axios
    .get('/api/logout/')
    .then(_ => callback(false))
    .catch(error => console.log(error))
}

/**
 *
 * @param callback
 */
export const getMessagesAction = (callback: (message: string, level: AlertColor) => void): void => {
  axios
    .get('/api/messages/')
    .then((response: AxiosResponse) => {
      const messages = response.data.messages
      if (messages.length !== 0) {
        callback(messages[0].message, messages[0].level)
      }
    })
    .catch((error: AxiosResponse) => console.log(error))
}

// Utility functions
const successAuthResponse = (authCallback: AuthCallback): (response: AxiosResponse) => void => {
  return (response: AxiosResponse<AuthResponse>) => {
    authCallback(false, response.data.displayName, response.data.userId, response.data.userType)
  }
}
