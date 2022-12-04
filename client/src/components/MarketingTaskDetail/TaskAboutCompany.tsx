import * as React from 'react'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/material'
import TaskInfoItems from './TaskInfoItems'
import Divider from '@mui/material/Divider'
import { useLoaderData } from 'react-router-dom'
import { MarketingTask } from '../../utils/types'

export default function TaskAboutCompany (): JSX.Element {
  const { company } = useLoaderData() as MarketingTask

  return (
    <React.Fragment>
      <Card sx={{ boxShadow: 'none', m: 2, mb: 3, backgroundColor: 'inherit' }}>
        <Box display="flex">
          <Box sx={{ mr: 3 }}>
            <Avatar alt="company-logo" sx={{ width: '100px', height: '100px' }}/>
          </Box>
          <Stack spacing={1}>
            <Typography variant="h6">{company.companyName}</Typography>
            <Typography color="text.secondary">{company.shortBio || 'No Short Bio Provided'}</Typography>
          </Stack>
        </Box>
      </Card>

      <Card sx={{ p: 2, border: '1px solid grey' }}>
        <Box p={2}>
          <TaskInfoItems label="Location" text={company.location || 'No Location Provided'}/>
          <TaskInfoItems label="Industry" text={company.industry || 'No Industry Provided'}/>
        </Box>
        <Divider/>
        <Box p={2}>
          <Typography variant="body1" color="text.secondary" fontWeight="light">
            {company.description || 'No Description Provided'}
          </Typography>
        </Box>
      </Card>
    </React.Fragment>
  )
}
