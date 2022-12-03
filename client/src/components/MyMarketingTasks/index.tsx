import { Box, Container } from '@mui/material'
import Grid from '@mui/material/Grid'
import TasksBox from '../Shared/TasksBox'
import React, { useState, useEffect }  from 'react'
import { upload } from '@testing-library/user-event/dist/upload';
import axios from 'axios';
import useAuth from '../../hooks/AuthHook'
import { getCookie } from '../../utils/utils'
import CreateTaskForm from './CreateTaskForm'

export default function MyMarketingTasks (): JSX.Element {

  const auth = useAuth();
  const [ title, setTitle] = useState("");
  const [ description, setDescription ] = useState("");
  const [ price, setPrice ] = useState("");
  const [ image, setImage ] = useState<any|null>(null);
  const [ tasks, setTasks ] = useState<{company: string, title: string, description: string, deliverables: string, compensation: string, postedDate: string, endDate: string, location: string, image: string}[]>([]);

  useEffect(() => {
    getTasks();
  }, [])

  const fetchData = new FormData();
  fetchData.append("userId", auth.userId)
  const getTasks = () => {
    axios.post('http://127.0.0.1:8000/api/get_company_tasks/', {"userId": auth.userId}, {
        headers: {
          'X-CSRFTOKEN': getCookie('csrftoken')
        }
    })
    .then(response => {
      setTasks(response.data.yo)
      console.log(response.data)
    })
    .catch(error => console.log(error))
  }


  return (

    <Container component="main" maxWidth="lg" >
      <CreateTaskForm refreshFunc={getTasks}></CreateTaskForm>
      <TasksBox tasks={tasks}></TasksBox>
    </Container>
  )
}
