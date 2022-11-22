import * as React from 'react'
import BusinessHome from './BusinessHome'
import { CommonProps, UserType } from '../../utils/types'
import InfluencerHome from './InfluencerHome'
import { isAuthenticated } from '../../utils/utils'

export default function Home (props: CommonProps): JSX.Element {
  return (
    <React.Fragment>
      {isAuthenticated(props.userType)
        ? (props.userType === UserType.BUSINESS ? <BusinessHome {...props}/> : <InfluencerHome {...props}/>)
        : <div>Hello World</div>
      }
    </React.Fragment>
  )
}
