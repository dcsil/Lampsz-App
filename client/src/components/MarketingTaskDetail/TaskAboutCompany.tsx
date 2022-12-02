import * as React from 'react'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/material'

interface TaskHeaderProps {
  companyName: string
  shortBio: string
}

export default function TaskAboutCompany ({ companyName, shortBio }: TaskHeaderProps): JSX.Element {
  return (
    <React.Fragment>
      <Card sx={{ boxShadow: 'none', mt: 2, ml: 2 }}>
        <Box display="flex">
          <Box sx={{ mr: 3 }}>
            <Avatar alt="company-logo" sx={{ width: '100px', height: '100px' }}/>
          </Box>
          <Stack spacing={1}>
            <Typography variant="h6">{companyName}</Typography>
            <Typography color="text.secondary">{shortBio}</Typography>
          </Stack>
        </Box>
      </Card>

      <Card sx={{ boxShadow: 'none' }}>

      </Card>
    </React.Fragment>
  )
}
