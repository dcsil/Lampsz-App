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

/**
 * Calls API server to edits user profile.
 *
 * @param userId the ID of the user.
 * @param body the content of the profile.
 * @param callback the success callback.
 */
export const editProfile = (userId: number, body: any, callback: VoidFunction): void => {
  const url = body.user.isInfluencer ? `/api/influencer/${userId}` : `/api/company/${userId}`
  axios
    .patch(url, body, getRequestConfig())
    .then(_ => callback())
    .catch((error: AxiosError) => console.log(error))
}
