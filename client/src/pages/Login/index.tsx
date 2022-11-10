import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Tab, Tabs } from '@mui/material';
import BusinessLogin from './BusinessLogin';
import TabPanel from "../../components/shared/TabPanel";
import Container from "@mui/material/Container";


export default function Login() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Business"/>
          <Tab label="Influencer"/>
        </Tabs>
        <TabPanel value={value} index={0}>
          <BusinessLogin/>
        </TabPanel>
      </Box>
    </Container>
  );
}
