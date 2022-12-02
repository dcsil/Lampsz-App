import { Box, Container } from '@mui/material'
import Grid from '@mui/material/Grid'
import MarketingTaskCard from '../Shared/MarketingTaskCard'
import React, { useState, useEffect }  from 'react'
import { upload } from '@testing-library/user-event/dist/upload';
import axios from 'axios';
import useAuth from '../../hooks/AuthHook'

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
    console.log(title);
    const uploadData = new FormData();
    uploadData.append("userId", auth.userId);
    uploadData.append("price", "12")
    uploadData.append("postedDate", "2022-11-30")
    uploadData.append("description", "this is a marketing task")
    uploadData.append('title', title);
    uploadData.append('image', image);

    fetch('http://127.0.0.1:8000/api/create_task/', {
      credentials: 'include',
      method: 'POST',
      body: uploadData
    })
    .then( res => console.log(res))
  }

  const fetchData = new FormData();
  const getTasks = () => {
    axios.post('http://127.0.0.1:8000/api/get_company_tasks/', {
        userId: auth.userId
    })
    .then(response => {
      setTasks(response.data.yo)
      console.log(response.data)
    })
    .catch(error => console.log(error))
  }

  // fetchData.append("userId", auth.userId);
  // fetch('http://127.0.0.1:8000/api/get_company_tasks/', {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json'
  //   },
  //   body: fetchData
  // })
  // .then( response => response.json() )
  // .then( response => JSON.stringify(response))
  // .then( data => {
  //   results = data;
  // }).then(() => console.log(results))

  return (

    <Container component="main" maxWidth="lg" >
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
      <Box sx={{ display: 'flex' }}>
        <img src='/media/images/best-berry-smoothie-recipe-06.jpg'/>
        <div>
          <label>
            Title
            <input type="text" value={title} onChange={(evt) => setTitle(evt.target.value)}/>
          </label>
          <label>
            Description
            <input type="text" value={description} onChange={(evt) => setDescription(evt.target.value)}/>
          </label>
          <label>
            Image
            <input type="file" onChange={(evt) => setImage(evt.target!.files![0])}/>
          </label>
          <label>
            Price
            <input type="text" value={price} onChange={(evt) => setPrice(evt.target.value)}/>
          </label>
          <button onClick={() => newTask()}>New Task</button>
      </div>
      </Box>
    </Container>
  )
}
