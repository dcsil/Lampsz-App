import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Routes from './components/Routes';
import Container from '@mui/material/Container';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Routes/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
