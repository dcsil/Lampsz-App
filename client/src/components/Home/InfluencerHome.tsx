import * as React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import ApplicationList from './ApplicationList'
import ProfileLink from './ProfileLink'
import MarketplaceLink from './MarketplaceLink'
import { containerStyle } from '../../utils/sharedStyles'

export default function InfluencerHome (): JSX.Element {
  return (
    <Box component="main" sx={containerStyle.contentBox}>
      <Container maxWidth="lg" sx={containerStyle.contentContainer}>
        <Grid container spacing={3}>
          {/* Profile Link */}
          <Grid item lg={6} xs={12}>
            <ProfileLink/>
          </Grid>
          {/* Marketplace Link */}
          <Grid item lg={6} xs={12}>
            <MarketplaceLink/>
          </Grid>
          {/* Applications List */}
          <Grid item xs={12}>
            <ApplicationList/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
