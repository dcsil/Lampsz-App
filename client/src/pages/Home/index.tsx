import React from 'react'
import BusinessHome from './BusinessHome'
import { AuthProps } from '../../utils/sharedProps'

export default function Home (props: AuthProps): JSX.Element {
  return (
    <React.Fragment>
      {props.auth
        ? <BusinessHome/>
        : <div>Hello World</div>
      }
    </React.Fragment>
  )
}
