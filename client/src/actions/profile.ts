import axios, { AxiosError, AxiosResponse } from 'axios'
import { SetState } from '../utils/types'
import useAuth from '../hooks/AuthHook'

export const getUserProfile = (userId: string | undefined, setInfluencer: SetState<{ username: string; userType: number}>): void => {
  axios
  .get('/api/profile/'+userId)
  .then((response:AxiosResponse) => {
    setInfluencer(response.data)})
  .catch((error: AxiosError) => console.log(error))
}

export const editBusinessProfile = (userId: string| undefined, csrf:string | null, body: any):void =>{
  axios.put('/api/company/'+userId, body, {
    headers:{
      'X-CSRFToken': csrf,
      'Content-Type': 'application/json'
    }
  })
  .then((response:AxiosResponse) => {})
  .catch((error: AxiosError) => console.log(error))
}

export const editInfluencerProfile = (userId: string| undefined, csrf:string | null, body: any):void =>{
  axios.put('/api/influencer/'+userId, body, {
    headers:{
      'X-CSRFToken': csrf,
      'Content-Type': 'application/json'
    }
  })
  .then((response:AxiosResponse) => {})
  .catch((error: AxiosError) => console.log(error))
}
