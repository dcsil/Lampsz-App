import axios, { AxiosError, AxiosResponse } from 'axios'
import { SetState, UserType } from '../utils/types'
import { getRequestConfig } from '../utils/utils'

export const getUserProfile = (userId: number, setInfluencer: SetState<{ username: string, userType: number }>): void => {
  axios
    .get(`/api/profile/${userId}`)
    .then((response: AxiosResponse) => {
      setInfluencer(response.data)
    })
    .catch((error: AxiosError) => console.log(error))
}

export const editProfile = (userId: number, body: any): void => {
  const url = body.userType === UserType.BUSINESS ? `/api/company/${userId}` : `/api/influencer/${userId}`
  axios
    .put(url, body, getRequestConfig())
    .then((response: AxiosResponse) => {
    })
    .catch((error: AxiosError) => console.log(error))
}
