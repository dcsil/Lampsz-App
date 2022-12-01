import * as React from 'react'
import { UserType } from '../../utils/types'
import { useParams } from 'react-router-dom'
import BusinessProfile from './BusinessProfile'
import InfluencerProfile from './InfluencerProfile'
import { getUserProfile } from '../../actions/profile'

export default function Profile (): JSX.Element {
  const dict = { username: '', userType: 0 }
  const [user, setUser] = React.useState(dict)
  const { userId } = useParams()
  React.useEffect(() => {
    getUserProfile(userId, setUser)
  }, [])
  if (user.userType === UserType.NONE) {
    return <></>
  } else {
    return (
      <React.Fragment>
        {user.userType === UserType.BUSINESS
          ? <BusinessProfile company={user} userId={userId}/>
          : <InfluencerProfile influencer={user} userId={userId}/>
        }
      </React.Fragment>
    )
  }
}
