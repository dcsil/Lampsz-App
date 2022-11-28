import * as React from 'react'
import Box from '@mui/material/Box'
import LoginForm from './LoginForm'
import Container from '@mui/material/Container'
import { containerStyle } from '../../utils/sharedStyles'

export default function Login (): JSX.Element {
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ ...containerStyle.centeredBox, marginTop: 8 }}>
        <LoginForm/>
      </Box>
    </Container>
  )
}
