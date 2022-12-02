import * as React from 'react'
import { containerStyle } from '../../utils/utils'
import Container from '@mui/material/Container'
import { Tab, Tabs } from '@mui/material'
import TabPanel from '../Shared/TabPanel'
import AppBar from '@mui/material/AppBar'
import TaskOverview from './TaskOverview'
import TaskHeader from './TaskHeader'
import TaskAboutCompany from './TaskAboutCompany'

const description = 'Curabitur consectetur velit nibh, et mollis elit auctor in. Proin id diam ipsum. Phasellus vel\n' +
  'turpis tincidunt, rhoncus risus efficitur, laoreet ipsum. Suspendisse auctor facilisis lorem.\n' +
  'Vestibulum pulvinar posuere lacus, quis ullamcorper urna pulvinar aliquet. Suspendisse et\n' +
  'ullamcorper purus. Morbi eget lobortis ligula.'

export default function MarketingTaskDetail (): JSX.Element {
  const [tabValue, setTabValue] = React.useState(0)
  const [title] = React.useState('Marketing Task Title')
  const [companyName] = React.useState('Company Name')

  const handleTabChange = (event: React.SyntheticEvent, newValue: number): void => {
    setTabValue(newValue)
  }

  return (
    <Container component="main" maxWidth="lg" sx={containerStyle.contentContainer}>
      <TaskHeader title={title} companyName={companyName}/>

      <AppBar position="static" sx={{ mt: 2, borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          sx={{ borderRadius: 4 }}
        >
          <Tab label="Overview"/>
          <Tab label="About the Company"/>
          <Tab label="Applicants"/>
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <TaskOverview
          description={description}
          deliverables={description}
          compensation="$140 CAD"
          location="Toronto"
          postedDate="2022-12-02"
          endDate="2022-12-02"
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <TaskAboutCompany
          companyName={companyName}
          shortBio="This company is a test company."
        />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        Item Three
      </TabPanel>
    </Container>
  )
}
