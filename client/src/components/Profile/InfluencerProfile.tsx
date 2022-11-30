import * as React from 'react'
import { useEffect } from 'react'
import {useParams} from "react-router-dom"
import Box from '@mui/material/Box'
import { containerStyle } from '../../utils/sharedStyles'
import Grid from '@mui/material/Grid'
import ProfileInfo from './ProfileInfo'
import useAuth from '../../hooks/AuthHook'
import ProfileDescription from './ProfileDescription'
import { containerStyle } from '../../utils/utils'

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

export default function InfluencerProfile ({influencer}: any): JSX.Element {
  return (
    <div>
    <Box component="main" sx={containerStyle.contentBox}>
      <div style={styles.infoContainer}>
        <Grid container spacing={4} direction="column">
          <Grid item xs={4}>
            <ProfileInfo user={influencer}/>
          </Grid>
          <Grid item xs={4}>
            <ProfileDescription description={influencer.about}/>
          </Grid>
        </Grid>
      </div>
      <div style={styles.contentContainer}>
        <p>hello yoooo</p>
      </div>
    </Box>
    <button>Edit</button>
    </div>
  )
}
