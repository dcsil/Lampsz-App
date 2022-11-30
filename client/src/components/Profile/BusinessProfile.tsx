import * as React from 'react'
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import FactoryIcon from '@mui/icons-material/Factory'
import { containerStyle } from '../../utils/sharedStyles'
import ProfileInfo from './ProfileInfo'
import ProfileDescription from './ProfileDescription'

const styles = {
  infoContainer:{
    display: 'flex',
    flexGrow: 1,
    overflow: 'auto',
    width: 1/4
  },
  contentContainer:{
    display: 'flex',
    flexGrow: 1,
    overflow: 'auto',
    width: 3/4
  }
}

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

export default function BusinessProfile ({company}: any): JSX.Element {
  return (
    <Box component="main" sx={containerStyle.contentBox}>
      <div style={styles.infoContainer}>
        <Grid container spacing={4} direction="column">
          <Grid item xs={4}>
            <ProfileInfo user={company}/>
          </Grid>
          <Grid item xs={4}>
            <ProfileDescription description={company.about}/>
          </Grid>
        </Grid>
      </div>
      <div style={styles.contentContainer}>
        <p>hello yoooo</p>
      </div>
    </Box>
  )
}
