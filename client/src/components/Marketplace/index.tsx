import * as React from 'react'
import Box from '@mui/material/Box'
import MarketingTaskCard from '../Shared/MarketingTaskCard'
import Grid from '@mui/material/Grid'

const data = [
  {
    title: 'T1',
    description: 'asdfassdfasdf'
  },
  {
    title: 'T2',
    description: 'asdfassdfasdf'
  },
  {
    title: 'T3',
    description: 'asdfassdfasdf'
  },
  {
    title: 'T4',
    description: 'asdfassdfasdf'
  },
  {
    title: 'T5',
    description: 'asdfassdfasdf'
  },
  {
    title: 'T6',
    description: 'asdfassdfasdf'
  },
  {
    title: 'T7',
    description: 'asdfassdfasdf'
  },
  {
    title: 'T8',
    description: 'asdfassdfasdf'
  },
  {
    title: 'T9',
    description: 'asdfassdfasdf'
  },
  {
    title: 'T10',
    description: 'asdfassdfasdf'
  },
  {
    title: 'T11',
    description: 'asdfassdfasdf'
  },
  {
    title: 'T12',
    description: 'asdfassdfasdf'
  }
]

export default function Marketplace (): JSX.Element {
  return (
    <Box sx={{ display: 'flex' }}>
        <Grid container spacing={5}>
            {data.map((item, index) =>
            (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
                    <MarketingTaskCard title={item.title} description={item.description} height = '400' />
                </Grid>
            )
            )}
        </Grid>
    </Box>
  )
}
