import * as React from 'react'
import { ReactElement, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Routes from './components/Routes'
import { blue, indigo } from '@mui/material/colors'
import CssBaseline from '@mui/material/CssBaseline'
import './App.css'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import useToast from './hooks/ToastHook'

const theme = createTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    },
    background: {
      default: '#f7f7f7'
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
  const toast = useToast()

  const handleClose = (): void => {
    toast.setToastOpen(false)
  }

  useEffect(() => {
    toast.getToastMessage()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Snackbar open={toast.toastOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={toast.level}>
          {toast.message}
        </Alert>
      </Snackbar>

      <CssBaseline/>
      <Routes/>
    </ThemeProvider>
  )
}

export default App
