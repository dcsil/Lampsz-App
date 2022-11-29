import * as React from 'react'
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import ProfileInfo from './ProfileInfo'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BoyIcon from '@mui/icons-material/Boy'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { getInfluencerProfile } from '../../actions/profile'
import ProfileDescription from './ProfileDescription'
import { containerStyle } from '../../utils/utils'

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
  const [influencerName, setInfluencerName] = React.useState('Influencer Name')
  const [description, setDescription] = React.useState('')

  useEffect(() => {
    getInfluencerProfile('temp', setInfluencerName, setDescription)
  })

  return (
    <Box component="main" sx={containerStyle.contentBox}>
      <Container maxWidth="md" sx={containerStyle.contentContainer}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <ProfileInfo items={items} name={influencerName}/>
          </Grid>
          <Grid item xs={12}>
            <ProfileDescription description={description}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
