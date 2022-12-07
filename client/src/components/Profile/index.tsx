import * as React from 'react'
import { UserType } from '../../utils/types'
import { useParams } from 'react-router-dom'
import { getUserProfile } from '../../actions/profile'
import ProfileBase from './ProfileBase'
import Loading from '../Loading'

export default function Profile (): JSX.Element {
  const [user, setUser] = React.useState({ username: '', userType: UserType.NONE })
  const { userId } = useParams()
  const influencerItems = ['Location', 'Age', 'Subscribers', 'Likes', 'Description']
  const businessItems = ['Location', 'Industry', 'Description']

  React.useEffect(() => {
    getUserProfile(parseInt(userId!), setUser)
  }, [])

  return user.userType === UserType.NONE
    ? <Loading/>
    : (
      <React.Fragment>
        {user.userType === UserType.BUSINESS
          ? <ProfileBase items={businessItems} user={user} userId={parseInt(userId!)}/>
          : <ProfileBase items={influencerItems} user={user} userId={parseInt(userId!)}/>
        }
      </React.Fragment>
      )
}
