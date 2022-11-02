import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Routes from './components/Routes';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes/>
    </ThemeProvider>
  );
}

export default App;
