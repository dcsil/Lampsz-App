import * as React from 'react'
import Box from '@mui/material/Box'
import { Tab, Tabs } from '@mui/material'
import BusinessSignup from './BusinessSignup'
import TabPanel from '../Shared/TabPanel'
import Container from '@mui/material/Container'
import { AuthProps } from '../../utils/sharedProps'
import InfluencerSignup from './InfluencerSignup'
import { containerStyle } from '../../utils/sharedStyles'

export default function Signup (props: AuthProps): JSX.Element {
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
          <BusinessSignup {...props}/>
        </TabPanel>
        <TabPanel index={value} value={1}>
          <InfluencerSignup {...props}/>
        </TabPanel>
      </Box>
    </Container>
  )
}
