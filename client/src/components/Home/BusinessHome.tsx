import * as React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import MarketingTaskList from './MarketingTaskList'
import ProfileLink from './ProfileLink'
import MarketplaceLink from './MarketplaceLink'
import { containerStyle } from '../../utils/sharedStyles'
import useAuth from '../../hooks/AuthHook'

export default function BusinessHome (): JSX.Element {
  const auth = useAuth()

  return (
    <Box component="main" sx={containerStyle.contentBox}>
      <Container maxWidth="lg" sx={containerStyle.contentContainer}>
        <Grid container spacing={3}>
          {/* Profile Link */}
          <Grid item lg={6} xs={12}>
            <ProfileLink username={auth.username}/>
          </Grid>
          {/* Marketplace Link */}
          <Grid item lg={6} xs={12}>
            <MarketplaceLink/>
          </Grid>
          {/* Marketing Task List */}
          <Grid item xs={12}>
            <MarketingTaskList/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
