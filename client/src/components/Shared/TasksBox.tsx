import * as React from 'react'
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import MarketingTaskCard from '../Shared/MarketingTaskCard'
import { MarketingTask } from '../../utils/types'

export default function TasksBox ({ tasks }: { tasks: MarketingTask[] }): JSX.Element {
  return (
    <Box sx={{ display: 'flex' }}>
      <Grid container spacing={5}>
        {tasks.map((item, index) =>
          (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={index}>
              <MarketingTaskCard
                title={item.title}
                description={item.description}
                compensation={item.compensation}
                postedDate={item.postedDate}
                endDate={item.endDate}
                location={item.location}
                image={item.image}
              />
            </Grid>
          )
        )}
      </Grid>
    </Box>
  )
}
