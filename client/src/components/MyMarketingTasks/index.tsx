import { Container, Stack } from '@mui/material'
import TasksBox from '../Shared/TasksBox'
import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/AuthHook'
import MarketingTaskForm from './MarketingTaskForm'
import { MarketingTask } from '../../utils/types'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { containerStyle } from '../../utils/utils'
import Divider from '@mui/material/Divider'
import { getTasks } from '../../actions/marketingTask'

export default function MyMarketingTasks (): JSX.Element {
  const auth = useAuth()
  const [activeTasks, setActiveTasks] = useState<MarketingTask[]>([])
  const [inactiveTasks, setInactiveTasks] = useState<MarketingTask[]>([])
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => getTasks(auth.userId, setActiveTasks, setInactiveTasks), [])

  return (
    <Container component="main" maxWidth="lg" sx={containerStyle.contentContainer}>
      <Box display="flex" justifyContent="space-between" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>My Marketing Tasks</Typography>
        </Box>
        <Stack p={1} spacing={1}>
          <Button variant="outlined" onClick={() => setOpen(true)}>Create New Task</Button>
        </Stack>
      </Box>
      {activeTasks.length > 0
        ? <TasksBox tasks={activeTasks}></TasksBox>
        : <Typography>No Active Marketing Task.</Typography>
      }

      <Divider sx={{ mt: 4, mb: 4 }}/>

      <Box display="flex" sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>Inactive/Past Tasks</Typography>
      </Box>
      {inactiveTasks.length > 0
        ? <TasksBox tasks={inactiveTasks}></TasksBox>
        : <Typography>No Inactive/Past Marketing Task.</Typography>
      }

      <MarketingTaskForm open={open} closeDialog={() => setOpen(false)} isCreate={true}/>
    </Container>
  )
}
