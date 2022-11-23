import * as React from 'react'
import BusinessHome from './BusinessHome'
import { UserType } from '../../utils/types'
import InfluencerHome from './InfluencerHome'
import { isAuthenticated } from '../../utils/utils'
import useAuth from '../../hooks/AuthHook'

export default function Home (): JSX.Element {
  const auth = useAuth()

  return (
    <React.Fragment>
      {isAuthenticated(auth.userType)
        ? (auth.userType === UserType.BUSINESS ? <BusinessHome/> : <InfluencerHome/>)
        : <div>Hello World</div>
      }
    </React.Fragment>
  )
}
