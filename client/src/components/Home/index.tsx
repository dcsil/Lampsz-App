import * as React from 'react'
import BusinessHome from './BusinessHome'
import { AuthProps } from '../../utils/sharedProps'
import { UserType } from '../../utils/types'
import InfluencerHome from './InfluencerHome'

export default function Home (props: AuthProps): JSX.Element {
  return (
    <React.Fragment>
      {props.auth
        ? (props.userType === UserType.BUSINESS ? <BusinessHome/> : <InfluencerHome/>)
        : <div>Hello World</div>
      }
    </React.Fragment>
  )
}
