import * as React from 'react'
import { useState } from 'react'
import { containerStyle } from '../../utils/utils'
import Container from '@mui/material/Container'
import { TaskApplication } from '../../utils/types'
import InfoCardDisplay from '../Shared/InfoCardDisplay'
import { getAllApplications } from '../../actions/taskApplication'
import TasksBox from '../Shared/TasksBox'

export default function MyApplications (): JSX.Element {
  const [applications, setApplications] = useState<TaskApplication[]>([])
  React.useEffect(() => getAllApplications(setApplications), [])

  return (
    <Container component="main" maxWidth="lg" sx={containerStyle.contentContainer}>
      <InfoCardDisplay title="My Applications">
        <TasksBox
          tasks={applications.map(a => a.marketingTask)}
          appliedOn={applications.map(a => a.appliedOn)}
          noDataText="No Marketing Task Applications."
        />
      </InfoCardDisplay>
    </Container>
  )
}
