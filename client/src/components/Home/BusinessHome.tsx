import * as React from 'react'
import Box from '@mui/material/Box'
import MarketingTaskList from './MarketingTaskList'
import { containerStyle } from '../../utils/utils'
import HomePageGrid from './HomePageGrid'

export default function BusinessHome (): JSX.Element {
  return (
    <Box component="main" sx={containerStyle.contentBox}>
      <HomePageGrid listComp={<MarketingTaskList/>}/>
    </Box>
  )
}
