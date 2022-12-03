import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import MarketingTaskCard from '../Shared/MarketingTaskCard'
import TasksBox from '../Shared/TasksBox'
import Grid from '@mui/material/Grid'
import useAuth from '../../hooks/AuthHook'
import { Container } from '@mui/system'
import axios from 'axios';
import { getCookie } from '../../utils/utils'
import { getTasks } from '../../actions/tasks'

export default function Marketplace (): JSX.Element {
  const auth = useAuth()
  const [ tasks, setTasks ] = useState<{id: string, company: string, title: string, description: string, deliverables: string, compensation: string, posted_date: string, end_date: string, location: string, image: string}[]>([]);

  useEffect(() => {
    getTasks(auth.userId, getCookie('csrftoken'), setTasks);
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

    <Container component="main" maxWidth="lg" >
      <TasksBox tasks={tasks}></TasksBox>
    </Container>

  )
}
