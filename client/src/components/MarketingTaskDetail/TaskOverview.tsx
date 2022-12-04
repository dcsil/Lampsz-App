import * as React from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import TextDisplayWithEdit from '../Shared/TextDisplayWithEdit'
import TaskInfoItems from './TaskInfoItems'
import { MarketingTask } from '../../utils/types'
import MarketingTaskForm from '../MyMarketingTasks/MarketingTaskForm'

export default function TaskOverview ({ taskData }: { taskData: MarketingTask }): JSX.Element {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  return (
    <Card sx={{ boxShadow: 'none' }}>
      <MarketingTaskForm
        closeDialog={() => setDialogOpen(false)}
        open={dialogOpen}
        isCreate={false}
        taskData={taskData}
      />
      <TextDisplayWithEdit
        title="Description"
        text={taskData.description || 'No Description Provided'}
        showEdit
        editAction={() => setDialogOpen(true)}
      />
      <Divider/>
      <TextDisplayWithEdit
        title="Deliverables"
        text={taskData.deliverables || 'No Deliverables Provided'}
      />
      <Divider/>
      <Box p={2}>
        <TaskInfoItems label="Compensation" text={taskData.compensation.toString()}/>
        <TaskInfoItems label="Location" text={taskData.location}/>
        <TaskInfoItems label="Posted Date" text={taskData.postedDate}/>
        <TaskInfoItems label="End Date" text={taskData.endDate}/>
      </Box>
    </Card>
  )
}
