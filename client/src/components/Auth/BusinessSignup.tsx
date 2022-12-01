import * as React from 'react'
import Box from '@mui/material/Box'
import { UserType } from '../../utils/types'
import { useNavigate } from 'react-router-dom'
import { containerStyle, formFieldOnChange, hasError } from '../../utils/utils'
import AuthTitle from './AuthTitle'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import useAuth from '../../hooks/AuthHook'
import { FormTextField } from '../Shared/FormTextField'
import useToast from '../../hooks/ToastHook'

const styles = {
  form: {
    mt: 3
  },
  signinButton: {
    mt: 3,
    mb: 2
  }
}

export default function BusinessSignup (): JSX.Element {
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confPassword, setConfPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const auth = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  /**
   * Handles business register form submission.
   *
   * @param event form submission event.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    auth.register(username, email, password, confPassword, UserType.BUSINESS, setError, () => {
      navigate('/')
      toast.getToastMessage()
    })
  }

  return (
    <Box sx={containerStyle.centeredBox}>
      <AuthTitle title="Business Sign up"/>
      <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
        <FormTextField
          id="username" label="Username" autoComplete="username"
          error={hasError(error)} autoFocus value={username}
          onChange={formFieldOnChange(setUsername, setError)}
        />
        <FormTextField
          id="email" label="Email Address" autoComplete="email"
          error={hasError(error)} value={email}
          onChange={formFieldOnChange(setEmail, setError)}
        />
        <FormTextField
          id="password" label="Password" autoComplete="new-password" type="password"
          error={hasError(error)} value={password}
          onChange={formFieldOnChange(setPassword, setError)}
        />
        <FormTextField
          id="confirm-password" label="Confirm Password" type="password"
          error={hasError(error)} value={confPassword} errorMsg={error}
          onChange={formFieldOnChange(setConfPassword, setError)}
        />
        <Button type="submit" fullWidth variant="contained" sx={styles.signinButton}>
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
