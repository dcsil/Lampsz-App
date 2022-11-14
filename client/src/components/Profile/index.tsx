import * as React from 'react'
import Container from '@mui/material/Container'
import { AuthProps } from '../../utils/sharedProps'
import { UserType } from '../../utils/types'
import BusinessProfile from './BusinessProfile'
import InfluencerProfile from './InfluencerProfile'

export default function Profile (props: AuthProps): JSX.Element {
  return (
    <Container component="main" maxWidth="xs">
      {props.userType === UserType.BUSINESS
        ? <BusinessProfile/>
        : <InfluencerProfile/>
      }
    </Container>
  )
}
