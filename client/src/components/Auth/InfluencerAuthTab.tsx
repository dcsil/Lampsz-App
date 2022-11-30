import * as React from 'react'
import { containerStyle } from '../../utils/utils'
import AuthTitle from './AuthTitle'
import GoogleButton from 'react-google-button'
import Box from '@mui/material/Box'

const styles = {
  googleButton: {
    width: '100%'
  }
}

export default function InfluencerAuthTab ({ label }: { label: string }): JSX.Element {
  /**
   * Utility function that redirect user to Google OAuth page.
   */
  const handleGoogleSync = (): void => {
    (window as Window).location = `${window.location.origin}/api/authorize/`
  }

  return (
    <Box sx={containerStyle.centeredBox}>
      <AuthTitle title="Influencer Sign up"/>
      <GoogleButton
        onClick={handleGoogleSync}
        label={label}
        style={styles.googleButton}
      />
    </Box>
  )
}
