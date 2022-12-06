import React, { useEffect, useState } from 'react'
import TasksBox from '../Shared/TasksBox'
import { useAuth } from '../../hooks/AuthHook'
import { Container } from '@mui/system'
import { MarketingTask } from '../../utils/types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { getTasks } from '../../actions/marketingTask'
import { SearchBar } from '../Shared/SearchBar'
import { containerStyle } from '../../utils/utils'

export default function Marketplace (): JSX.Element {
  const auth = useAuth()
  const [tasks, setTasks] = useState<MarketingTask[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => getTasks(0, setTasks), [])

  return (
    <Container component="main" maxWidth="lg" sx={containerStyle.contentContainer}>
      <Box display="flex" sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>Marketplace</Typography>
      </Box>
      <SearchBar setTasks={setTasks}></SearchBar>
      <TasksBox tasks={tasks}></TasksBox>
    </Container>
  )
}
