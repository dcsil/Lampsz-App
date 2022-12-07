import * as React from 'react'
import Grid from '@mui/material/Grid'
import MarketingTaskCard from '../Shared/MarketingTaskCard'
import { MarketingTask } from '../../utils/types'
import Typography from '@mui/material/Typography'

export default function TasksBox (
  {
    tasks,
    appliedOn,
    noDataText,
    shrink
  }: {
    tasks: MarketingTask[]
    noDataText: string
    appliedOn?: string[]
    shrink?: boolean
  }
): JSX.Element {
  return tasks.length > 0
    ? (
      <Grid container spacing={5}>
        {tasks.map((taskData, index) => (
          <Grid item xs={12} md={shrink ? 12 : 4} lg={shrink ? 6 : 3} key={index}>
            <MarketingTaskCard
              taskData={taskData}
              appliedDate={appliedOn ? appliedOn[index] : undefined}
            />
          </Grid>
        ))}
      </Grid>
      )
    : <Typography>{noDataText}</Typography>
}
