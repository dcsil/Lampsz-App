import * as React from 'react'
import GoogleButton from 'react-google-button'
import Box from '@mui/material/Box'
import AuthTitle from '../Shared/AuthTitle'
import { containerStyle, handleGoogleSync } from '../../utils/utils'

const styles = {
  googleButton: {
    width: '100%'
  }
}

export default function InfluencerLogin (): JSX.Element {
  return (
    <Box sx={containerStyle.centeredBox}>
      <AuthTitle title="Influencer Login"/>
      <GoogleButton
        onClick={handleGoogleSync}
        label="Google Login"
        style={styles.googleButton}
      />
    </Box>
  )
}
