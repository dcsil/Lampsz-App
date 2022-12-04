import React, { useEffect, useState } from 'react'
import TasksBox from '../Shared/TasksBox'
import useAuth from '../../hooks/AuthHook'
import { Container } from '@mui/system'
import { MarketingTask } from '../../utils/types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { containerStyle } from '../../utils/utils'
import { getTasks } from '../../actions/marketingTask'

export default function Marketplace (): JSX.Element {
  const auth = useAuth()
  const [tasks, setTasks] = useState<MarketingTask[]>([])

  useEffect(() => getTasks(auth.userId, setTasks), [])

  return (
    <Container component="main" maxWidth="lg" sx={containerStyle.contentContainer}>
      <Box display="flex" sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>Marketplace</Typography>
      </Box>
      <TasksBox tasks={tasks}></TasksBox>
    </Container>

  )
}
