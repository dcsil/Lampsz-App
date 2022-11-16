import * as React from 'react'
import Paper from '@mui/material/Paper'
import { Stack, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { containerStyle } from '../../utils/sharedStyles'

export default function ProfileLink (): JSX.Element {
  return (
    <Paper sx={containerStyle.centeredPaper}>
      <Stack direction='column'>
        <Typography component="h1" variant="h5">
          Welcome User!
        </Typography>
        <Button href="/profile">Profile</Button>
      </Stack>
    </Paper>
  )
}
