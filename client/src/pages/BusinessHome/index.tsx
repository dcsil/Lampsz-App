import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MarketingTaskList from "./MarketingTaskList";


export default function BusinessHome() {

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline/>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => theme.palette.grey[100],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar/>
        <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
          <Grid container spacing={3}>
            {/* Marketing Task List */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <MarketingTaskList/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
