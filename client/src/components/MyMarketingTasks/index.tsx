import { Container } from '@mui/material'
import TasksBox from '../Shared/TasksBox'
import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/AuthHook'
import MarketingTaskForm from './MarketingTaskForm'
import { getTasks } from '../../actions/tasks'
import { MarketingTask } from '../../utils/types'
import Button from '@mui/material/Button'

export default function MyMarketingTasks (): JSX.Element {
  const auth = useAuth()
  const [tasks, setTasks] = useState<MarketingTask[]>([])
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => getTasks(auth.userId, setTasks), [])

  return (
    <Container component="main" maxWidth="lg">
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Create New Task
      </Button>
      <MarketingTaskForm open={open} closeDialog={() => setOpen(false)} isCreate={true}/>
      <TasksBox tasks={tasks}></TasksBox>
    </Container>
  )
}
