import * as React from 'react'
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import { containerStyle } from '../../utils/sharedStyles'
import { formFieldOnChange, hasError, isAuthenticated } from '../../utils/utils'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/AuthHook'

const styles = {
  avatar: {
    m: 1,
    bgcolor: 'secondary.main'
  },
  form: {
    mt: 3
  },
  button: {
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
  const navigate = useNavigate()
  const auth = useAuth()

  /**
   * Handles business register form submission.
   *
   * @param event form submission event.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    // businessRegister(username, email, password, confPassword, setError, )
    auth.register(username, email, password, confPassword, setError)
  }

  useEffect(() => {
    // Navigate user to home page after login
    if (isAuthenticated(auth.userType)) {
      navigate('/')
    }
  })

  // Component JSX
  return (
    <Box sx={containerStyle.centeredBox}>
      <Avatar sx={styles.avatar}>
        <LockOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Business Sign up
      </Typography>
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
          sx={styles.button}
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
