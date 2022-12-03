import axios from 'axios'
import Cookies from 'js-cookie'

export const getTasks = (userId: number, setTasks: Function): void => {
  axios
    .get((`/api/tasks?user_id=${userId}`), {
      headers: {
        'X-CSRFTOKEN': Cookies.get('csrftoken')
      }
    })
    .then(response => {
      setTasks(response.data)
      console.log(response.data)
    })
    .catch(error => console.log(error))
}
