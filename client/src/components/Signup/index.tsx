import * as React from 'react'
import Box from '@mui/material/Box'
import BusinessSignup from './BusinessSignup'
import Container from '@mui/material/Container'
import { containerStyle } from '../../utils/utils'
import AuthTabs from '../Shared/AuthTabs'
import InfluencerAuthTab from '../Shared/InfluencerAuthTab'

export default function Signup (): JSX.Element {
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ ...containerStyle.centeredBox, marginTop: 8 }}>
        <AuthTabs
          businessComp={<BusinessSignup/>}
          influencerComp={<InfluencerAuthTab label="Sync with Google"/>}
        />
      </Box>
    </Container>
  )
}
