import * as React from 'react'
import { useState } from 'react'
import { TaskApplication } from '../../utils/types'
import { getAllApplications } from '../../actions/taskApplication'
import TasksBox from '../Shared/TasksBox'
import ListDisplay from './ListDisplay'

export default function ApplicationList (): JSX.Element {
  const [applications, setApplications] = useState<TaskApplication[]>([])
  React.useEffect(() => getAllApplications(setApplications), [])

  return (
    <ListDisplay title="Your Applications" content="applications" link="/applications">
      <TasksBox
        tasks={applications.slice(0, 4).map(a => a.marketingTask)}
        appliedOn={applications.splice(0, 4).map(a => a.appliedOn)}
      />
    </ListDisplay>
  )
}
