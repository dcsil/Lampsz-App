import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import * as React from 'react'
import { containerStyle, formFieldOnChange, hasError } from '../../utils/utils'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/AuthHook'
import AuthTitle from '../Shared/AuthTitle'
import { FormTextField } from '../Shared/FormTextField'

const styles = {
  avatar: {
    m: 1,
    bgcolor: 'secondary.main'
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

    auth.login(username, password, setError, () => {
      navigate('/', { replace: true })
    })
  }

  return (
    <Box sx={containerStyle.centeredBox}>
      <AuthTitle title="Business Login"/>
      <Box component="form" onSubmit={handleSubmit}>
        <FormTextField
          id="username"
          label="Username"
          error={hasError(error)}
          autoComplete="username"
          autoFocus
          value={username}
          onChange={formFieldOnChange(setUsername, setError)}
        />
        <FormTextField
          id="password"
          label="Password"
          error={hasError(error)}
          autoComplete="current-password"
          value={password}
          type="password"
          onChange={formFieldOnChange(setPassword, setError)}
        />
        <Button type="submit" fullWidth variant="contained" sx={styles.button}>
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/signup" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
