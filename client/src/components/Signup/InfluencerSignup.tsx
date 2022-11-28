import * as React from 'react'
import Box from '@mui/material/Box'
import { containerStyle } from '../../utils/sharedStyles'
import GoogleButton from 'react-google-button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import SignupForm from './SignupForm'
import { UserType } from '../../utils/types'
import useAuth from '../../hooks/AuthHook'

const styles = {
  googleButton: {
    width: '100%'
  }
}

export default function InfluencerSignup (): JSX.Element {
  const [activeStep, setActiveStep] = React.useState(0)
  const auth = useAuth()

  const handleNext = (): void => {
    setActiveStep(activeStep + 1)
  }

  const handleGoogleSync = (): void => {
    (window as Window).location = `http://127.0.0.1:8000/api/authorize/${auth.userId}`
  }

  return (
    <Box sx={containerStyle.centeredBox}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h5" align="center">
          Influencer Sign up
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 3 }}>
          <Step>
            <StepLabel>Sign up</StepLabel>
          </Step>
          <Step>
            <StepLabel>Sync with Google</StepLabel>
          </Step>
        </Stepper>
        <React.Fragment>
          {(activeStep === 0)
            ? <SignupForm userType={UserType.INFLUENCER} callback={handleNext}/>
            : <GoogleButton
              onClick={handleGoogleSync}
              label="Sync with Google"
              style={styles.googleButton}
            />
          }
        </React.Fragment>
      </Paper>
    </Box>
  )
}
