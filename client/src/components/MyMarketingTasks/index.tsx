import { Box, Container } from '@mui/material'
import Grid from '@mui/material/Grid'
import TasksBox from '../Shared/TasksBox'
import React, { useState, useEffect }  from 'react'
import { upload } from '@testing-library/user-event/dist/upload';
import axios from 'axios';
import useAuth from '../../hooks/AuthHook'
import { getCookie } from '../../utils/utils'
import CreateTaskForm from './CreateTaskForm'
import { getTasks } from '../../actions/tasks';

export default function MyMarketingTasks (): JSX.Element {

  const auth = useAuth();
  const [ title, setTitle] = useState("");
  const [ description, setDescription ] = useState("");
  const [ price, setPrice ] = useState("");
  const [ image, setImage ] = useState<any|null>(null);
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
      <CreateTaskForm refreshFunc={getTasks} userId={auth.userId} csrf={getCookie('csrftoken')} setTasks={setTasks}></CreateTaskForm>
      <TasksBox tasks={tasks}></TasksBox>
    </Container>
  )
}
