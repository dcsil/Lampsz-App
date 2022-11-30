import axios, { AxiosError, AxiosResponse } from 'axios'
import { SetState } from '../utils/types'

export const getUserProfile = (userId: string | undefined, setInfluencer: SetState<{ username: string; userType: number}>): void => {
  axios
  .get('/api/profile/'+userId)
  .then((response:AxiosResponse) => {
    setInfluencer(response.data)})
  .catch((error: AxiosError) => console.log(error))
}
