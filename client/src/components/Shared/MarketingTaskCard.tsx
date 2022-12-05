import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { MarketingTask } from '../../utils/types'
import { CardHeader, Stack } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'

interface MarketingTaskCardProps {
  taskData: MarketingTask
  appliedDate?: string
}

export default function MarketingTaskCard ({ taskData, appliedDate }: MarketingTaskCardProps): JSX.Element {
  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardHeader
        component={Link}
        to={`/profile/${taskData.company.user.id}`}
        avatar={<Avatar/>}
        title={taskData.company.companyName}
        subheader={`${taskData.location} - ${taskData.postedDate}`}
      />
      <CardMedia component="img" height={200} image={taskData.image}/>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" textTransform="capitalize">
          {taskData.title}
        </Typography>
        <Stack sx={{ mt: 1 }} spacing={1}>
          <Typography variant="body2" color="text.secondary">
            <strong>End date: </strong> {taskData.endDate}
          </Typography>
          {appliedDate &&
            <Typography variant="body2" color="text.secondary">
              <strong>Applied on: </strong> {appliedDate}
            </Typography>
          }
        </Stack>
      </CardContent>
      <CardActions>
        <Grid container alignItems="center">
          <Grid item xs>
            <Button size="small" href={`/tasks/${taskData.id}`}>View Details</Button>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" mr={1}>
              ${taskData.compensation}
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}
