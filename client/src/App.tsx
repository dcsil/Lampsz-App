import React, { useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Routes from './components/Routes'
import Nav from './components/Nav'
import { blue, indigo } from '@mui/material/colors'
import { checkSession } from './actions/auth'
import { UserType } from './utils/types'

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

function App (): JSX.Element {
  // true if user is authenticated, otherwise false
  const [auth, setAuth] = React.useState(false)
  const [userType, setUserType] = React.useState(UserType.NONE)

  useEffect(() => {
    if (!['/login', '/register'].includes(window.location.pathname)) {
      checkSession(setAuth, setUserType)
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Nav auth={auth} userType={userType} setAuth={setAuth}/>
      <Routes auth={auth} userType={userType} setAuth={setAuth}/>
    </ThemeProvider>
  )
}

export default App
