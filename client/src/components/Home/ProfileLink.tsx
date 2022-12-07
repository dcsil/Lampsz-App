import * as React from 'react'
import Paper from '@mui/material/Paper'
import { Stack, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { containerStyle } from '../../utils/utils'
import { useAuth } from '../../hooks/AuthHook'

export default function ProfileLink ({ displayName }: { displayName: string }): JSX.Element {
  const auth = useAuth()
  return (
    <Paper sx={containerStyle.centeredPaper}>
      <Stack direction='column'>
        <Typography variant="h5">
          Welcome {displayName}!
        </Typography>
        <Button href={`/profile/${auth.userId}`}>View Profile</Button>
      </Stack>
    </Paper>
  )
}
