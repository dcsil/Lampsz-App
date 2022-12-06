import * as React from 'react'
import { containerStyle } from '../../utils/utils'
import Container from '@mui/material/Container'
import { Tab, Tabs } from '@mui/material'
import TabPanel from '../Shared/TabPanel'
import AppBar from '@mui/material/AppBar'
import TaskOverview from './TaskOverview'
import TaskHeader from './TaskHeader'
import TaskAboutCompany from './TaskAboutCompany'
import { useLoaderData } from 'react-router-dom'
import { MarketingTask } from '../../utils/types'
import { useAuth } from '../../hooks/AuthHook'
import Alert from '@mui/material/Alert'
import ApplicantTable from './ApplicantTable'

export default function MarketingTaskDetail (): JSX.Element {
  const [tabValue, setTabValue] = React.useState(0)
  const { company, active } = useLoaderData() as MarketingTask
  const auth = useAuth()

  const handleTabChange = (event: React.SyntheticEvent, newValue: number): void => {
    setTabValue(newValue)
  }

  return (
    <Container component="main" maxWidth="lg" sx={containerStyle.contentContainer}>
      {!active && <Alert severity="warning" sx={{ mb: 3 }}>This marketing task is no longer active.</Alert>}
      <TaskHeader/>

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
          {company.user.id === auth.userId && <Tab label="Applicants"/>}
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <TaskOverview/>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <TaskAboutCompany/>
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <ApplicantTable/>
      </TabPanel>
    </Container>
  )
}
