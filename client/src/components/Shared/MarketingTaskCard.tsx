import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { MarketingTask } from '../../utils/types'

export default function MarketingTaskCard ({ taskData }: { taskData: MarketingTask }): JSX.Element {
  return (
    <Card sx={{ width: '100%' }}>
      <CardMedia
        component="img"
        height={400}
        image={taskData.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {taskData.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {taskData.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {taskData.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {taskData.compensation}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {taskData.postedDate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {taskData.endDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={`/tasks/${taskData.id}`}>View Details</Button>
      </CardActions>
    </Card>
  )
}
