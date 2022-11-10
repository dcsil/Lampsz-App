import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Routes from './components/Routes';
import Nav from './components/Nav';
import { blue, indigo } from "@mui/material/colors";

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
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Nav/>
      <Routes/>
    </ThemeProvider>
  );
}

export default App;
