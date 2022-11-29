import * as React from 'react'
import Paper from '@mui/material/Paper'
import { Stack, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { containerStyle } from '../../utils/utils'

interface ProfileLinkProps {
  username: string
}

export default function ProfileLink ({ username }: ProfileLinkProps): JSX.Element {
  return (
    <Paper sx={containerStyle.centeredPaper}>
      <Stack direction='column'>
        <Typography component="h1" variant="h5">
          Welcome {username}!
        </Typography>
        <Button href="/profile">View Profile</Button>
      </Stack>
    </Paper>
  )
}
