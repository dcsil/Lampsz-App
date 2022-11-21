import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Routes from './components/Routes'
import Nav from './components/Nav'
import { blue, indigo } from '@mui/material/colors'
import { checkSession } from './actions/auth'
import { UserType } from './utils/types'
import CssBaseline from '@mui/material/CssBaseline'
import './App.css'
import Loading from './components/Loading'

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

interface AppStates {
  userType: UserType
  csrf: string
  isReadingCookie: boolean
}

class App extends React.Component<any, AppStates> {
  state = {
    userType: UserType.NONE,
    csrf: '',
    isReadingCookie: true
  }

  setUserType = (userType: UserType): void => {
    this.setState({ userType })
  }

  setCsrf = (csrf: string): void => {
    this.setState({ csrf })
  }

  setIsReadingCookie = (isReadingCookie: boolean): void => {
    this.setState({ isReadingCookie })
  }

  componentDidMount (): void {
    checkSession(this.setUserType, this.setCsrf, this.setIsReadingCookie)
  }

  render (): JSX.Element {
    return (
      <ThemeProvider theme={theme}>
        <Nav userType={this.state.userType} setUserType={this.setUserType} csrf={this.state.csrf} setCsrf={this.setCsrf}/>
        <CssBaseline/>
        <Routes userType={this.state.userType} setUserType={this.setUserType} csrf={this.state.csrf} setCsrf={this.setCsrf}/>
      </ThemeProvider>
    )
  }
}

export default App
