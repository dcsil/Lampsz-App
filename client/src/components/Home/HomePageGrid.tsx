import * as React from 'react'
import { containerStyle } from '../../utils/utils'
import Grid from '@mui/material/Grid'
import ProfileLink from './ProfileLink'
import MarketplaceLink from './MarketplaceLink'
import Container from '@mui/material/Container'
import { useAuth } from '../../hooks/AuthHook'
import Box from '@mui/material/Box'
import { UserType } from '../../utils/types'
import ApplicationList from './ApplicationList'
import MarketingTaskList from './MarketingTaskList'

export default function HomePageGrid (): JSX.Element {
  const auth = useAuth()

  return (
    <Box component="main" sx={containerStyle.contentBox}>
      <Container maxWidth="lg" sx={containerStyle.contentContainer}>
        <Grid container spacing={3}>
          {/* Profile Link */}
          <Grid item lg={6} xs={12}>
            <ProfileLink displayName={auth.displayName}/>
          </Grid>
          {/* Marketplace Link */}
          <Grid item lg={6} xs={12}>
            <MarketplaceLink/>
          </Grid>
          <Grid item xs={12}>
            {auth.userType === UserType.INFLUENCER ? <ApplicationList/> : <MarketingTaskList/>}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
