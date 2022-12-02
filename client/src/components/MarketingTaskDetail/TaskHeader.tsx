import * as React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { Stack } from '@mui/material'
import useAuth from '../../hooks/AuthHook'
import { UserType } from '../../utils/types'

interface TaskHeaderProps {
  title: string
  companyName: string
}

export default function TaskHeader ({ title, companyName }: TaskHeaderProps): JSX.Element {
  const auth = useAuth()

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h4" gutterBottom>{title}</Typography>
          <Box display="flex" alignItems="center">
            <Box sx={{ m: 1 }}>
              <Avatar alt="company-logo"/>
            </Box>
            <Box>
              <Typography>{companyName}</Typography>
            </Box>
          </Box>
        </Box>
        <Stack p={1} spacing={1}>
          {auth.userType === UserType.INFLUENCER && <Button variant="outlined" color="info">Apply</Button>}
          <Button variant="outlined" color="warning">Contact Company</Button>
        </Stack>
      </Box>
    </React.Fragment>
  )
}
