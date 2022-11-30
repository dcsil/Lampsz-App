import * as React from 'react'
import { Tab, Tabs } from '@mui/material'
import TabPanel from '../Shared/TabPanel'
import { containerStyle } from '../../utils/utils'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

export default function AuthTabs (
  { businessComp, influencerComp }: { businessComp: JSX.Element, influencerComp: JSX.Element }
): JSX.Element {
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
          {businessComp}
        </TabPanel>
        <TabPanel index={value} value={1}>
          {influencerComp}
        </TabPanel>
      </Box>
    </Container>
  )
}
