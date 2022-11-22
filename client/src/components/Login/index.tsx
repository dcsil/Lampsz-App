import * as React from 'react'
import Box from '@mui/material/Box'
import { Tab, Tabs } from '@mui/material'
import BusinessLogin from './BusinessLogin'
import TabPanel from '../Shared/TabPanel'
import Container from '@mui/material/Container'
import { CommonProps } from '../../utils/sharedProps'
import InfluencerLogin from './InfluencerLogin'
import { containerStyle } from '../../utils/sharedStyles'

export default function Login (props: CommonProps): JSX.Element {
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
          <BusinessLogin {...props}/>
        </TabPanel>
        <TabPanel index={value} value={1}>
          <InfluencerLogin {...props}/>
        </TabPanel>
      </Box>
    </Container>
  )
}
