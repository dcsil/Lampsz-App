import * as React from 'react'
import { containerStyle } from '../../utils/utils'
import Grid from '@mui/material/Grid'
import ProfileLink from './ProfileLink'
import MarketplaceLink from './MarketplaceLink'
import Container from '@mui/material/Container'
import useAuth from '../../hooks/AuthHook'

export default function HomePageGrid ({ listComp }: { listComp: JSX.Element }): JSX.Element {
  const auth = useAuth()

  return (
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
        <Grid item xs={12}>
          {listComp}
        </Grid>
      </Grid>
    </Container>
  )
}
