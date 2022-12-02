import { Box, Container } from '@mui/material'
import Grid from '@mui/material/Grid'
import MarketingTaskCard from '../Shared/MarketingTaskCard'
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
  const [ tasks, setTasks ] = useState<{company: string, title: string, description: string, price: string, postedDate: string, image: string}[]>([]);

  useEffect(() => {
    getTasks();
  }, [])

  const newTask = () => {
    const uploadData = new FormData();
    uploadData.append("userId", auth.userId);
    uploadData.append("price", "12")
    uploadData.append("postedDate", "2022-11-30")
    uploadData.append("description", "this is a marketing task")
    uploadData.append('title', title);
    uploadData.append('image', image);

    axios.post('http://127.0.0.1:8000/api/create_task/', uploadData, {
      headers: {
        'X-CSRFTOKEN': getCookie('csrftoken')
      }
    })
    .then((response) => {
      console.log(response);
      getTasks();
    })
    .catch(error => console.log(error))
  }

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
      <Box sx={{ display: 'flex' }}>
          <Grid container spacing={5}>
              {tasks.map((item, index) =>
              (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
                      <MarketingTaskCard title={auth.userId} description={auth.username} height = '400' />
                  </Grid>
              )
              )}

          </Grid>
      </Box>
    </Container>
  )
}
