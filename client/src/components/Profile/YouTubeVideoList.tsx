import * as React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

export default function YouTubeVideoList ({ urls }: { urls: string[] }): JSX.Element {
  return urls.length > 0
    ? (
      <Grid container spacing={5}>
        {urls.map((url, index) => (
          <Grid item xs={12} lg={6} key={index}>
            <iframe src={url} width='280' height='280' allowFullScreen/>
          </Grid>
        ))}
      </Grid>
      )
    : <Typography>No Youtube Videos available.</Typography>
}
