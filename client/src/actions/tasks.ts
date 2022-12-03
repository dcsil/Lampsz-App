import axios, { AxiosError, AxiosResponse } from 'axios'
import { SetState } from '../utils/types'


export const getTasks = (userId: string, csrf: string | null, setTasks:Function): void => {
    axios.get((`/api/tasks?user_id=${userId}` ), {
        headers: {
        'X-CSRFTOKEN': csrf
        }
    })
    .then(response => {
    setTasks(response.data)
    console.log(response.data)
    })
    .catch(error => console.log(error))
}
