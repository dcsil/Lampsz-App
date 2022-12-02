import * as React from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import TextDisplayWithEdit from '../Shared/TextDisplayWithEdit'
import TaskInfoItems from './TaskInfoItems'

interface TaskOverviewProps {
  description: string
  deliverables: string
  compensation: string
  location: string
  postedDate: string
  endDate: string
}

export default function TaskOverview (
  {
    description,
    deliverables,
    compensation,
    location,
    postedDate,
    endDate
  }: TaskOverviewProps
): JSX.Element {
  return (
    <Card sx={{ boxShadow: 'none' }}>
      <TextDisplayWithEdit title="Description" text={description || 'No Description Provided'}/>
      <Divider/>
      <TextDisplayWithEdit title="Deliverables" text={deliverables || 'No Deliverables Provided'}/>
      <Divider/>
      <Box p={2}>
        <TaskInfoItems label="Compensation" text={compensation}/>
        <TaskInfoItems label="Location" text={location}/>
        <TaskInfoItems label="Posted Date" text={postedDate}/>
        <TaskInfoItems label="End Date" text={endDate}/>
      </Box>
    </Card>
  )
}
