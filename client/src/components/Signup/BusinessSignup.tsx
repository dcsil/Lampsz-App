import * as React from 'react'
import Box from '@mui/material/Box'
import { UserType } from '../../utils/types'
import { useNavigate } from 'react-router-dom'
import { containerStyle, formFieldOnChange, hasError } from '../../utils/utils'
import AuthTitle from '../Shared/AuthTitle'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import useAuth from '../../hooks/AuthHook'

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

  /**
   * Handles business register form submission.
   *
   * @param event form submission event.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    auth.register(username, email, password, confPassword, UserType.BUSINESS, setError, () => navigate('/login'))
  }

  return (
    <Box sx={containerStyle.centeredBox}>
      <AuthTitle title="Business Sign up"/>

      <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="username"
              required
              fullWidth
              id="username"
              label="Username"
              autoComplete="username"
              autoFocus
              error={hasError(error)}
              value={username}
              onChange={(event) => formFieldOnChange(event, setUsername, setError)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={hasError(error)}
              value={email}
              onChange={(event) => formFieldOnChange(event, setEmail, setError)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              error={hasError(error)}
              value={password}
              onChange={(event) => formFieldOnChange(event, setPassword, setError)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              error={hasError(error)}
              helperText={error}
              value={confPassword}
              onChange={(event) => formFieldOnChange(event, setConfPassword, setError)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={styles.signinButton}
        >
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
