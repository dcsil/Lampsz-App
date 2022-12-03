import axios from 'axios'


export const getTasks = (userId: number, csrf: string | undefined, setTasks: Function): void => {
  axios
    .get((`/api/tasks?user_id=${userId}`), {
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
