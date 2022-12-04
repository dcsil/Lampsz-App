import * as React from 'react'
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import MarketingTaskCard from '../Shared/MarketingTaskCard'
import { MarketingTask } from '../../utils/types'

export default function TasksBox ({ tasks }: { tasks: MarketingTask[] }): JSX.Element {
  return (
    <Box sx={{ display: 'flex' }}>
      <Grid container spacing={5}>
        {tasks.map((taskData, index) =>
          (
            <Grid item xs={12} md={4} lg={3} key={index}>
              <MarketingTaskCard taskData={taskData}/>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  )
}
