import { Container } from '@mui/material'
import TasksBox from '../Shared/TasksBox'
import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/AuthHook'
import CreateTaskForm from './CreateTaskForm'
import { getTasks } from '../../actions/tasks'
import Cookies from 'js-cookie'

export default function MyMarketingTasks (): JSX.Element {
  const auth = useAuth()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState<any | null>(null)
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
      <CreateTaskForm refreshFunc={getTasks} userId={auth.userId} csrf={Cookies.get('csrftoken')} setTasks={setTasks}></CreateTaskForm>
      <TasksBox tasks={tasks}></TasksBox>
    </Container>
  )
}
