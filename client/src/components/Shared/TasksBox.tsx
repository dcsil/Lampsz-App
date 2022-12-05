import * as React from 'react'
import Grid from '@mui/material/Grid'
import MarketingTaskCard from '../Shared/MarketingTaskCard'
import { MarketingTask } from '../../utils/types'

export default function TasksBox ({ tasks, appliedOn }: { tasks: MarketingTask[], appliedOn?: string[] }): JSX.Element {
  return (
    <Grid container spacing={5}>
      {tasks.map((taskData, index) =>
        (
          <Grid item xs={12} md={4} lg={3} key={index}>
            <MarketingTaskCard
              taskData={taskData}
              appliedDate={appliedOn ? appliedOn[index] : undefined}
            />
          </Grid>
        )
      )}
    </Grid>
  )
}
