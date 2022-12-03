import React, { useEffect, useState } from 'react'
import TasksBox from '../Shared/TasksBox'
import useAuth from '../../hooks/AuthHook'
import { Container } from '@mui/system'
import { getTasks } from '../../actions/tasks'
import Cookies from 'js-cookie'

export default function Marketplace (): JSX.Element {
  const auth = useAuth()
  const [tasks, setTasks] = useState<Array<{ id: string, company: string, title: string, description: string, deliverables: string, compensation: string, posted_date: string, end_date: string, location: string, image: string }>>([])

  useEffect(() => {
    getTasks(auth.userId, Cookies.get('csrftoken'), setTasks)
  }, [])

  // const getTasks = () => {
  //   axios.get('/api/tasks?' + 'user_id=' + String(auth.userId), {
  //       headers: {
  //         'X-CSRFTOKEN': getCookie('csrftoken')
  //       }
  //   })
  //   .then(response => {
  //     setTasks(response.data)
  //     console.log(response.data)
  //   })
  //   .catch(error => console.log(error))
  // }
  return (

    <Container component="main" maxWidth="lg">
      <TasksBox tasks={tasks}></TasksBox>
    </Container>

  )
}
