import * as React from 'react'
import { ReactElement } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Routes from './components/Routes'
import CssBaseline from '@mui/material/CssBaseline'
import './App.css'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useToast } from './hooks/ToastHook'

const theme = createTheme({
  palette: {
    secondary: {
      main: '#283593'
    },
    primary: {
      // main: indigo[700]
      main: '#00695c'
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

  React.useEffect(() => toast.getToastMessage(), [])

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
