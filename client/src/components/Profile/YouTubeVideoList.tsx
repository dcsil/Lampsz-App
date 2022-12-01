import * as React from 'react'
import { useEffect, useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Stack } from '@mui/material'

export default function YouTubeVideoList (): JSX.Element {
  // get influencerId
  const [urls, setUrls] = useState([])
  useEffect(() => {
    axios
      .get('/api/youtubeVideos')
      .then((response: AxiosResponse) => setUrls(response.data))
      .catch((error: AxiosError) => console.log(error))
  })
  if (urls.length === 0) {
    return <div></div>
  }
  return <div>
    {urls.map((url, index) => (
      <Stack direction="row" spacing={2} marginTop={3}>
        <iframe src={url}>
        </iframe>
      </Stack>
    ))}
  </div>
}
