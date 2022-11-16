import * as React from 'react'
import { AuthProps } from '../../utils/sharedProps'
import { UserType } from '../../utils/types'
import BusinessProfile from './BusinessProfile'
import InfluencerProfile from './InfluencerProfile'

export default function Profile (props: AuthProps): JSX.Element {
  return (
    <React.Fragment>
      {props.userType === UserType.BUSINESS
        ? <BusinessProfile/>
        : <InfluencerProfile/>
      }
    </React.Fragment>
  )
}
