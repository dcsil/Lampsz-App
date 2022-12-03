import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import MarketingTaskCard from '../Shared/MarketingTaskCard'
import useAuth from '../../hooks/AuthHook'


export default function TasksBox({tasks} : {tasks:Array<{company: string, title: string, description: string, deliverables: string, compensation: string, postedDate: string, endDate: string, location: string, image: string}>}): JSX.Element {
  return (
      <Box sx={{ display: 'flex' }}>
          <Grid container spacing={5}>
              {tasks.map((item, index) =>
              (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
                      <MarketingTaskCard title={item.title} description={item.description} compensation={item.compensation} postedDate={item.postedDate} endDate={item.endDate} location={item.location} image={item.image} />
                  </Grid>
              )
              )}

          </Grid>
      </Box>
  )
}
