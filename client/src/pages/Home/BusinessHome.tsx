import * as React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import MarketingTaskList from './MarketingTaskList'
import ProfileLink from './ProfileLink'
import MarketplaceLink from './MarketplaceLink'

export default function BusinessHome (): JSX.Element {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        backgroundColor: (theme) => theme.palette.grey[100],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto'
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
        <Grid container spacing={3}>
          {/* Profile Link */}
          <Grid item lg={6} xs={12}>
            <ProfileLink/>
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
