import * as React from 'react'
import { ReactElement, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Routes from './components/Routes'
import { blue, indigo } from '@mui/material/colors'
import CssBaseline from '@mui/material/CssBaseline'
import './App.css'
import { AuthProvider } from './hooks/AuthHook'
import { getMessages } from './actions/auth'
import Alert, { AlertColor } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const theme = createTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
})

function App (): ReactElement {
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [level, setLevel] = React.useState<AlertColor>('success')

  const handleClose = (): void => {
    setOpen(false)
  }

  useEffect(() => {
    getMessages(setMessage, setLevel, setOpen)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={level}>
          {message}
        </Alert>
      </Snackbar>
      <AuthProvider>
        <CssBaseline/>
        <Routes/>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
