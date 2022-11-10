import * as React from 'react'
import Link from '@mui/material/Link'
import PanelTitle from '../../components/shared/PanelTitle'
import MarketingTaskCard from '../../components/shared/MarketingTaskCard'
import { Stack } from '@mui/material'

const data = [
  {
    title: 'T1',
    description: 'asdfassdfasdf'
  },
  {
    title: 'T2',
    description: 'asdfassdfasdf'
  }
]

export default function MarketingTaskList (): JSX.Element {
  return (
    <React.Fragment>
      <PanelTitle variant="h5">Your Marketing Tasks</PanelTitle>
      <Stack direction="row" spacing={2} marginTop={3}>
        {data.map((item, index) => <MarketingTaskCard key={index} title={item.title} description={item.description}/>)}
      </Stack>
      <Link color="primary" href="#" sx={{ mt: 3 }}>
        See all your marketing tasks
      </Link>
    </React.Fragment>
  )
}
