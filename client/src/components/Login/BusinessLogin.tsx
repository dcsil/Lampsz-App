import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import * as React from 'react'
import { useEffect } from 'react'
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

export default function BusinessLogin (): JSX.Element {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
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

    // businessLogin(username, password, setError, appComponent)
    auth.login(username, password, setError)
  }

  useEffect(() => {
    console.log(auth)
    // Navigate user to home page after login
    if (isAuthenticated(auth.userType)) {
      navigate('/')
    }
  })

  return (
    <Box sx={containerStyle.centeredBox}>
      <Avatar sx={styles.avatar}>
        <LockOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={styles.form}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="username"
          name="username"
          autoComplete="username"
          autoFocus
          error={hasError(error)}
          value={username}
          onChange={(event) => formFieldOnChange(event, setUsername, setError)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          error={hasError(error)}
          helperText={error}
          value={password}
          onChange={(event) => formFieldOnChange(event, setPassword, setError)}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary"/>}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={styles.button}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/client/src/components/Signup" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
