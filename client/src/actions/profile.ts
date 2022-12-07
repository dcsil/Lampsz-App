import axios, { AxiosError } from 'axios'
import { getRequestConfig } from '../utils/utils'

/**
 * Calls API server to retrieve user profile data.
 *
 * @param userId the ID of the user.
 */
export const getUserProfile = async (userId: number): Promise<any> => {
  return (await axios.get(`/api/profile/${userId}`)).data
}

export const editProfile = (userId: number, body: any, callback: VoidFunction): void => {
  const url = body.user.isInfluencer ? `/api/influencer/${userId}` : `/api/company/${userId}`
  axios
    .put(url, body, getRequestConfig())
    .then(_ => callback())
    .catch((error: AxiosError) => console.log(error))
}
