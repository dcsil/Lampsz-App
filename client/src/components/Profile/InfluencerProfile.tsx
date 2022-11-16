import * as React from 'react'
import Box from '@mui/material/Box'
import { containerStyle } from '../../utils/sharedStyles'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import ProfileCard from './ProfileCard'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BoyIcon from '@mui/icons-material/Boy'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

const items = [
  {
    icon: <LocationOnIcon/>,
    label: 'Location',
    value: 'Toronto, Ontario'
  },
  {
    icon: <BoyIcon/>,
    label: 'Age',
    value: '12'
  },
  {
    icon: <SubscriptionsIcon/>,
    label: 'Subscribers',
    value: '1000'
  },
  {
    icon: <ThumbUpIcon/>,
    label: 'Likes',
    value: '1000'
  }
]

export default function InfluencerProfile (): JSX.Element {
  return (
    <Box component="main" sx={containerStyle.contentBox}>
      <Container maxWidth="md" sx={containerStyle.contentContainer}>
        <Grid container>
          <Grid item xs={12}>
            <ProfileCard items={items} name="Influencer Name"/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
