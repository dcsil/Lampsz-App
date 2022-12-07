import * as React from 'react'
import TasksBox from '../Shared/TasksBox'
import YouTubeVideoList from './YouTubeVideoList'
import ListDisplay from '../Shared/ListDisplay'
import { useLoaderData } from 'react-router-dom'

export default function ProfileContent ({ title, link }: { title: string, link: string }): JSX.Element {
  const data = useLoaderData() as any

  return (
    <ListDisplay title={title} content={title} link={link}>
      {data.user.isInfluencer
        ? <YouTubeVideoList urls={data.videoList}/>
        : <TasksBox tasks={data.marketingTask.slice(0, 4)} noDataText="No Active Marketing Task." shrink/>
      }
    </ListDisplay>
  )
}
