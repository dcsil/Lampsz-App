import { Container, Stack } from '@mui/material'
import TasksBox from '../Shared/TasksBox'
import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/AuthHook'
import MarketingTaskForm from './MarketingTaskForm'
import { getTasks } from '../../actions/tasks'
import { MarketingTask } from '../../utils/types'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { containerStyle } from '../../utils/utils'

export default function MyMarketingTasks (): JSX.Element {
  const auth = useAuth()
  const [tasks, setTasks] = useState<MarketingTask[]>([])
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => getTasks(auth.userId, setTasks), [])

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

      <MarketingTaskForm open={open} closeDialog={() => setOpen(false)} isCreate={true}/>
      <TasksBox tasks={tasks}></TasksBox>
    </Container>
  )
}
