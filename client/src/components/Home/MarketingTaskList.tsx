import * as React from 'react'
import Link from '@mui/material/Link'
import PanelTitle from '../Shared/PanelTitle'
import MarketingTaskCard from '../Shared/MarketingTaskCard'
import { Stack } from '@mui/material'
import Paper from '@mui/material/Paper'
import { containerStyle } from '../../utils/utils'
import { MarketingTask } from '../../utils/types'

const tasks: MarketingTask[] = []

export default function MarketingTaskList (): JSX.Element {
  return (
    <Paper sx={containerStyle.contentPaper}>
      <PanelTitle variant="h5">Your Marketing Tasks</PanelTitle>
      <Stack direction="row" spacing={2} marginTop={3}>
        {tasks.map((item, index) =>
          <MarketingTaskCard key={index} taskData={item}/>
        )}
      </Stack>
      <Link color="primary" href="/tasks" sx={{ mt: 3 }}>
        See all your marketing tasks
      </Link>
    </Paper>
  )
}
