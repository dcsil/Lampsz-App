import * as React from 'react'
import Link from '@mui/material/Link'
import PanelTitle from '../Shared/PanelTitle'
import MarketingTaskCard from '../Shared/MarketingTaskCard'
import { Stack } from '@mui/material'
import Paper from '@mui/material/Paper'
import { containerStyle } from '../../utils/utils'

const tasks = [
  {
    title: 'T1',
    description: 'asdfassdfasdf',
    compensation: '1000',
    postedDate: '2022-11-11',
    endDate: '2022-11-13',
    location: 'Toronto',
    image: '\awd'

  }
]


export default function MarketingTaskList (): JSX.Element {
  return (
    <Paper sx={containerStyle.contentPaper}>
      <PanelTitle variant="h5">Your Marketing Tasks</PanelTitle>
      <Stack direction="row" spacing={2} marginTop={3}>
        {tasks.map((item, index) => <MarketingTaskCard title={item.title} description={item.description} compensation={item.compensation} postedDate={item.postedDate} endDate={item.endDate} location={item.location} image={item.image}/>)}
      </Stack>
      <Link color="primary" href="/tasks" sx={{ mt: 3 }}>
        See all your marketing tasks
      </Link>
    </Paper>
  )
}
