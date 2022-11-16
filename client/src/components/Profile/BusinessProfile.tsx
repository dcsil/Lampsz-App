import * as React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import FactoryIcon from '@mui/icons-material/Factory'
import { containerStyle } from '../../utils/sharedStyles'
import ProfileCard from './ProfileCard'

const items = [
  {
    icon: <LocationOnIcon/>,
    label: 'Location',
    value: 'Toronto, Ontario'
  },
  {
    icon: <FactoryIcon/>,
    label: 'Industry',
    value: 'Food'
  }
]

export default function BusinessProfile (): JSX.Element {
  return (
    <Box component="main" sx={containerStyle.contentBox}>
      <Container maxWidth="md" sx={containerStyle.contentContainer}>
        <Grid container>
          <Grid item xs={12}>
            <ProfileCard items={items} name="Company Name"/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
