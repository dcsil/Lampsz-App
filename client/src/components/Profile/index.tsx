import * as React from 'react'
import { CommonProps, UserType } from '../../utils/types'
import BusinessProfile from './BusinessProfile'
import InfluencerProfile from './InfluencerProfile'

export default function Profile (props: CommonProps): JSX.Element {
  return (
    <React.Fragment>
      {props.userType === UserType.BUSINESS
        ? <BusinessProfile/>
        : <InfluencerProfile/>
      }
    </React.Fragment>
  )
}
