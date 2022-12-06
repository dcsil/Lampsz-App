import * as React from 'react'
import Paper from '@mui/material/Paper'
import { Stack, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { containerStyle } from '../../utils/utils'
import { useAuth } from '../../hooks/AuthHook'

interface ProfileLinkProps {
  username: string
}

export default function ProfileLink ({ username }: ProfileLinkProps): JSX.Element {
  const auth = useAuth()
  return (
    <Paper sx={containerStyle.centeredPaper}>
      <Stack direction='column'>
        <Typography variant="h5">
          Welcome {username}!
        </Typography>
        <Button href={`/profile/${auth.userId}`}>View Profile</Button>
      </Stack>
    </Paper>
  )
}
