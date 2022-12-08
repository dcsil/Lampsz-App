import * as React from 'react'
import { containerStyle, isAuthenticated } from '../../utils/utils'
import { useAuth } from '../../hooks/AuthHook'
import HomePageGrid from './HomePageGrid'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'

function DefaultHome (): JSX.Element {
  return (
    <Container component="main" maxWidth="md" sx={{ my: 6 }}>
      <Paper sx={{ ...containerStyle.centeredPaper, borderRadius: 4 }}>
        <Box component="img" alt="title" src="/static/public/lampsz-logo-title.png" sx={{ my: 2, borderRadius: 4 }}/>
        <Typography variant="h5" sx={{ mt: 2 }}>Influencer Marketing Done Right!</Typography>
        <Typography variant="subtitle1" sx={{ my: 4, mx: 8 }} color="text.secondary" textAlign="center">
          Lampsz is an online marketplace to connect influencers and businesses by providing easy-to-use and
          cost effective influencer marketing tools.
        </Typography>
        <Box justifyContent="space-evenly" display="flex" flexDirection="row" mb={3}>
          <Button href="/signup" variant="contained" color="secondary" size="large">Sign Up Today</Button>
          <Typography variant="h6" color="text.secondary" sx={{ mx: 4, pt: 0.5, fontWeight: 'bold' }}>OR</Typography>
          <Button href="/login" variant="contained" color="secondary" size="large">Login Here</Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default function Home (): JSX.Element {
  const auth = useAuth()

  return isAuthenticated(auth.userType) ? <HomePageGrid/> : <DefaultHome/>
}
