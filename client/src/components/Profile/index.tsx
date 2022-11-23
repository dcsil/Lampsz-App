import * as React from 'react'
import { UserType } from '../../utils/types'
import BusinessProfile from './BusinessProfile'
import InfluencerProfile from './InfluencerProfile'
import useAuth from '../../hooks/AuthHook'

export default function Profile (): JSX.Element {
  const auth = useAuth()

  return (
    <React.Fragment>
      {auth.userType === UserType.BUSINESS
        ? <BusinessProfile/>
        : <InfluencerProfile/>
      }
    </React.Fragment>
  )
}
