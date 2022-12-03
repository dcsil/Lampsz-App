import * as React from 'react'
import Box from '@mui/material/Box'
import MarketingTaskCard from '../Shared/MarketingTaskCard'
import TasksBox from '../Shared/TasksBox'
import Grid from '@mui/material/Grid'
import useAuth from '../../hooks/AuthHook'
import { Container } from '@mui/system'


export default function Marketplace (): JSX.Element {
  const auth = useAuth()

  return (

    <Container component="main" maxWidth="lg" >
      <TasksBox tasks={tasks}></TasksBox>
    </Container>

  )
}
