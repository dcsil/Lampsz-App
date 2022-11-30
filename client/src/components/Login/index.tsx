import * as React from 'react'
import Box from '@mui/material/Box'
import BusinessLogin from './BusinessLogin'
import Container from '@mui/material/Container'
import { containerStyle } from '../../utils/utils'
import AuthTabs from '../Shared/AuthTabs'
import InfluencerAuthTab from '../Shared/InfluencerAuthTab'

export default function Login (): JSX.Element {
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ ...containerStyle.centeredBox, marginTop: 8 }}>
        <AuthTabs
          businessComp={<BusinessLogin/>}
          influencerComp={<InfluencerAuthTab label="Google Login"/>}
        />
      </Box>
    </Container>
  )
}
