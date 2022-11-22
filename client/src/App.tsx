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
  userId: string
  username: string
  csrf: string
  isReadingCookie: boolean
}

class App extends React.Component<any, AppStates> {
  state = {
    userType: UserType.NONE,
    userId: '',
    username: '',
    csrf: '',
    isReadingCookie: true
  }

  setUserType = (userType: UserType): void => {
    this.setState({ userType })
  }

  setCsrf = (csrf: string): void => {
    this.setState({ csrf })
  }

  componentDidMount (): void {
    checkSession(this.setCsrf, this)
  }

  render (): JSX.Element {
    return (
      <ThemeProvider theme={theme}>
        <Nav
          userType={this.state.userType}
          setUserType={this.setUserType}
          setCsrf={this.setCsrf}
        />
        <CssBaseline/>
        {this.state.isReadingCookie
          ? <Loading/>
          : <Routes
            userType={this.state.userType}
            username={this.state.username}
            userId={this.state.userId}
            appComponent={this}
          />
        }
      </ThemeProvider>
    )
  }
}

export default App
