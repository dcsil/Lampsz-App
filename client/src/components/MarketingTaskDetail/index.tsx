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
import useAuth from '../../hooks/AuthHook'

export default function MarketingTaskDetail (): JSX.Element {
  const [tabValue, setTabValue] = React.useState(0)
  const taskData = useLoaderData() as MarketingTask
  const auth = useAuth()
  console.log(taskData)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number): void => {
    setTabValue(newValue)
  }

  return (
    <Container component="main" maxWidth="lg" sx={containerStyle.contentContainer}>
      <TaskHeader title={taskData.title} companyName={taskData.company.companyName}/>

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
          {taskData.company.user.userId === auth.userId && <Tab label="Applicants"/>}
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <TaskOverview taskData={taskData}/>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <TaskAboutCompany
          companyName={taskData.company.companyName}
          shortBio={taskData.company.shortBio}
          companyLocation={taskData.company.location}
          industry={taskData.company.industry}
          companyDescription={taskData.company.description}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        Item Three
      </TabPanel>
    </Container>
  )
}
