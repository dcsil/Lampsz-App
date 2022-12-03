import axios, { AxiosError, AxiosResponse } from 'axios'
import { SetState, UserType } from '../utils/types'

export const getUserProfile = (userId: number, setInfluencer: SetState<{ username: string, userType: number }>): void => {
  axios
    .get(`/api/profile/${userId}`)
    .then((response: AxiosResponse) => {
      setInfluencer(response.data)
    })
    .catch((error: AxiosError) => console.log(error))
}

export const editProfile = (userId: number, csrf: string | undefined, body: any): void => {
  const url = body.userType === UserType.BUSINESS ? `/api/company/${userId}` : `/api/influencer/${userId}`
  axios
    .put(url, body, {
      headers: {
        'X-CSRFToken': csrf,
        'Content-Type': 'application/json'
      }
    })
    .then((response: AxiosResponse) => {
    })
    .catch((error: AxiosError) => console.log(error))
}
