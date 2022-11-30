import * as React from 'react'
import { Tab, Tabs } from '@mui/material'
import TabPanel from './TabPanel'

export default function AuthTabs (
  { businessComp, influencerComp }: { businessComp: JSX.Element, influencerComp: JSX.Element }
): JSX.Element {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}
