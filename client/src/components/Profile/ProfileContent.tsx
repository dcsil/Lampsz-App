import * as React from 'react'
import useAuth from '../../hooks/AuthHook'
import { UserType } from '../../utils/types'
import TasksBox from '../Shared/TasksBox'
import YouTubeVideoList from './YouTubeVideoList'

interface ProfileContentProps {
    user: any
}
export default function ProfileContent ({user}: ProfileContentProps): JSX.Element {
    if(user.userType === UserType.INFLUENCER){
        return <YouTubeVideoList urls={user.videoList}/>
    }else{
        return <TasksBox tasks={user.marketingTask}/>
    }
    return <></>
  }
