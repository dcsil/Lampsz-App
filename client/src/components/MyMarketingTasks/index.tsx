import { Box } from '@mui/material'
import Grid from '@mui/material'
import MarketingTaskCard from '../Shared/MarketingTaskCard'
import React, { useState}  from 'react'
import { upload } from '@testing-library/user-event/dist/upload';
import axios from 'axios';

export default function MyMarketingTasks (): JSX.Element {

  const [title, setTitle] = useState("");
  const [ cover, setCover ] = useState<any|null>(null);

  const newBook = () => {
    console.log(title);
    const uploadData = new FormData();
    uploadData.append('title', title);
    uploadData.append('cover', cover);


    fetch('http://127.0.0.1:8000/api/upload_image/', {
      credentials: 'include',
      method: 'POST',
      body: uploadData
    })
    .then( res => console.log(res))
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <img src='/media/images/best-berry-smoothie-recipe-06.jpg'/>
      <div>
      <form encType="multipart/form-data">
        <label>
          Title
          <input type="text" value={title} onChange={(evt) => setTitle(evt.target.value)}/>
        </label>
        <label>
          Cover
          <input type="file" onChange={(evt) => setCover(evt.target!.files![0])}/>
        </label>
        <button type="submit" onClick={newBook}>New Book</button>
      </form>
     </div>
    </Box>
  )
}
