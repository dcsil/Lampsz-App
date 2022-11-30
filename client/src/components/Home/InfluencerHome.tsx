import * as React from 'react'
import Box from '@mui/material/Box'
import ApplicationList from './ApplicationList'
import { containerStyle } from '../../utils/utils'
import HomePageGrid from './HomePageGrid'

export default function InfluencerHome (): JSX.Element {
  return (
    <Box component="main" sx={containerStyle.contentBox}>
      <HomePageGrid listComp={<ApplicationList/>}/>
    </Box>
  )
}
