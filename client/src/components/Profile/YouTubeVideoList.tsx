import * as React from 'react'
import { useEffect, useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Stack } from '@mui/material'

export default function YouTubeVideoList ({urls}: any): JSX.Element {
  return <div>
    {urls.map((url:any, index:any) => (
      <Stack direction="row" spacing={2} marginTop={3}>
        <iframe width="420" height="315" src={url} frameBorder="0" allowFullScreen>
        </iframe>
      </Stack>
    ))}
  </div>
}
