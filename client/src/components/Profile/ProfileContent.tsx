import * as React from 'react'
import { UserType } from '../../utils/types'
import TasksBox from '../Shared/TasksBox'
import YouTubeVideoList from './YouTubeVideoList'
import ListDisplay from '../Shared/ListDisplay'

export default function ProfileContent (
  { title, user, link }: { title: string, user: any, link: string }
): JSX.Element {
  return (
    <ListDisplay title={title} content={title} link={link}>
      {user.userType === UserType.INFLUENCER
        ? <YouTubeVideoList urls={user.videoList}/>
        : <TasksBox tasks={user.marketingTask.slice(0, 4)} noDataText="No Active Marketing Task." shrink/>
      }
    </ListDisplay>
  )
}
