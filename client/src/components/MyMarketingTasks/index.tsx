import { Container, Stack } from '@mui/material'
import * as React from 'react'
import { useAuth } from '../../hooks/AuthHook'
import MarketingTaskForm from './MarketingTaskForm'
import { MarketingTask } from '../../utils/types'
import Button from '@mui/material/Button'
import { containerStyle } from '../../utils/utils'
import Divider from '@mui/material/Divider'
import { getTasks } from '../../actions/marketingTask'
import InfoCardDisplay from '../Shared/InfoCardDisplay'
import TasksBox from '../Shared/TasksBox'

export default function MyMarketingTasks (): JSX.Element {
  const auth = useAuth()
  const [activeTasks, setActiveTasks] = React.useState<MarketingTask[]>([])
  const [inactiveTasks, setInactiveTasks] = React.useState<MarketingTask[]>([])
  const [open, setOpen] = React.useState<boolean>(false)

  React.useEffect(() => getTasks(auth.userId, setActiveTasks, setInactiveTasks), [])

  return (
    <Container component="main" maxWidth="lg" sx={containerStyle.contentContainer}>
      <InfoCardDisplay
        title="My Marketing Tasks"
        actionButtons={
          <Stack p={1} spacing={1}>
            <Button variant="outlined" onClick={() => setOpen(true)}>Create New Task</Button>
          </Stack>
        }
      >
        <TasksBox tasks={activeTasks} noDataText="No Active Marketing Task."></TasksBox>
      </InfoCardDisplay>

      <Divider sx={{ mt: 4, mb: 4 }}/>

      <InfoCardDisplay title="Inactive/Past Tasks">
        <TasksBox tasks={inactiveTasks} noDataText="No Inactive/Past Marketing Task."></TasksBox>
      </InfoCardDisplay>

      <MarketingTaskForm open={open} closeDialog={() => setOpen(false)} isCreate={true}/>
    </Container>
  )
}
