import * as React from 'react'
import { ReactElement } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Routes from './components/Routes'
import { blue, indigo } from '@mui/material/colors'
import CssBaseline from '@mui/material/CssBaseline'
import './App.css'
import { AuthProvider } from './hooks/AuthHook'

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
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline/>
        <Routes/>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
