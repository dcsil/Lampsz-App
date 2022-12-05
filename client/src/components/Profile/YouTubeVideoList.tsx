import * as React from 'react'
import { useEffect, useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Stack } from '@mui/material'

export default function YouTubeVideoList (urls: any): JSX.Element {
  return <div>
    {urls.map((url:any, index:any) => (
      <Stack direction="row" spacing={2} marginTop={3}>
        <iframe src={url}>
        </iframe>
      </Stack>
    ))}
  </div>
}
