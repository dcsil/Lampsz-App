import * as React from 'react'
import Box from '@mui/material/Box'
import GoogleButton from 'react-google-button'
import { containerStyle, handleGoogleSync } from '../../utils/utils'
import AuthTitle from '../Shared/AuthTitle'

const styles = {
  googleButton: {
    width: '100%'
  }
}

export default function InfluencerSignup (): JSX.Element {
  return (
    <Box sx={containerStyle.centeredBox}>
      <AuthTitle title="Influencer Sign up"/>
      <GoogleButton
        onClick={handleGoogleSync}
        label="Sync with Google"
        style={styles.googleButton}
      />
    </Box>
  )
}
