import * as React from 'react'
import { UserType } from '../../utils/types'
import {useParams} from "react-router-dom"
import BusinessProfile from './BusinessProfile'
import InfluencerProfile from './InfluencerProfile'
import { getUserProfile } from '../../actions/profile'

export function Profile (): JSX.Element{
  type UserParam = {
    userId: string
  }
  var dict = {username: "", userType: 0}
  const [user, setUser] = React.useState(dict)
  const [editMode, setEditMode] = React.useState(false)
  let {userId} = useParams<UserParam>()
  React.useEffect(()=>{
    getUserProfile(userId, setUser)
  }, [])
  if(user.userType === UserType.NONE){
    return <></>
  }else{
      return (
    <React.Fragment>
      {user.userType === UserType.BUSINESS
        ? <BusinessProfile company={user}/>
        : <InfluencerProfile influencer={user}/>
      }
    </React.Fragment>
  )
  }
}
