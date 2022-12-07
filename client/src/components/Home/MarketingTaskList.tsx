import * as React from 'react'
import { MarketingTask } from '../../utils/types'
import { getTasks } from '../../actions/marketingTask'
import { useAuth } from '../../hooks/AuthHook'
import TasksBox from '../Shared/TasksBox'
import ListDisplay from '../Shared/ListDisplay'

export default function MarketingTaskList (): JSX.Element {
  const auth = useAuth()
  const [tasks, setTasks] = React.useState<MarketingTask[]>([])
  React.useEffect(() => getTasks(auth.userId, setTasks), [])

  return (
    <ListDisplay title="Your Marketing Tasks" content="marketing tasks" link="/tasks">
      <TasksBox tasks={tasks.slice(0, 4)} noDataText="No Active Marketing Task."></TasksBox>
    </ListDisplay>
  )
}
