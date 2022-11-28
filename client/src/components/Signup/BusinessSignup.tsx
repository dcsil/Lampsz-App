import { containerStyle } from '../../utils/sharedStyles'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import Box from '@mui/material/Box'
import SignupForm from './SignupForm'
import { UserType } from '../../utils/types'
import { useNavigate } from 'react-router-dom'

const styles = {
  avatar: {
    m: 1,
    bgcolor: 'secondary.main'
  }
}

export default function BusinessSignup (): JSX.Element {
  const navigate = useNavigate()

  return (
    <Box sx={containerStyle.centeredBox}>
      <Avatar sx={styles.avatar}>
        <LockOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Business Sign up
      </Typography>
      <SignupForm userType={UserType.BUSINESS} callback={() => navigate('/login')}/>
    </Box>
  )
}
