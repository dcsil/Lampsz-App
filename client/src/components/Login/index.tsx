import * as React from 'react'
import Box from '@mui/material/Box'
import BusinessLogin from './BusinessLogin'
import Container from '@mui/material/Container'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TabPanel from '../Shared/TabPanel'
import InfluencerLogin from './InfluencerLogin'
import { containerStyle } from '../../utils/utils'

export default function Login (): JSX.Element {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ ...containerStyle.centeredBox, marginTop: 8 }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Business"/>
          <Tab label="Influencer"/>
        </Tabs>
        <TabPanel value={value} index={0}>
          <BusinessLogin/>
        </TabPanel>
        <TabPanel index={value} value={1}>
          <InfluencerLogin/>
        </TabPanel>
      </Box>
    </Container>
  )
}
