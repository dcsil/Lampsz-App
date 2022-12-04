import * as React from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import TextDisplayWithEdit from '../Shared/TextDisplayWithEdit'
import TaskInfoItems from './TaskInfoItems'
import { MarketingTask } from '../../utils/types'
import MarketingTaskForm from '../MyMarketingTasks/MarketingTaskForm'
import useAuth from '../../hooks/AuthHook'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import { useLoaderData } from 'react-router-dom'

export default function TaskOverview (): JSX.Element {
  const auth = useAuth()
  const taskData = useLoaderData() as MarketingTask
  const [dialogOpen, setDialogOpen] = React.useState(false)

  return (
    <Grid container spacing={3}>
      <Grid item md>
        <Card sx={{ p: 2 }}>
          <Box display="flex" margin={2}>
            <Typography variant="h6" fontWeight="medium">Task Image</Typography>
          </Box>
          {taskData.image === null
            ? <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Task media has not been provided by the company.
              </Typography>
            </CardContent>
            : <CardMedia component="img" image={taskData.image} alt="task-image"/>
          }
        </Card>
      </Grid>
      <Grid item md>
        <Card sx={{ p: 2 }}>
          <TextDisplayWithEdit
            title="Description"
            text={taskData.description || 'No Description Provided'}
            showEdit={auth.userId === taskData.company.user.id}
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

          <MarketingTaskForm
            closeDialog={() => setDialogOpen(false)}
            open={dialogOpen}
            isCreate={false}
            taskData={taskData}
          />
        </Card>
      </Grid>
    </Grid>
  )
}
