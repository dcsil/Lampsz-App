import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

interface MarketingTaskCardProp {
  title: string
  description: string
  compensation: number
  postedDate: string
  endDate: string
  location: string
  image: string
}

export default function MarketingTaskCard ({ title, description, compensation, postedDate, endDate, location, image }: MarketingTaskCardProp): JSX.Element {
  return (
    <Card sx={{ width: '100%' }}>
      <CardMedia
        component="img"
        height={400}
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {compensation}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {postedDate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {endDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href="/tasks/1">View Details</Button>
      </CardActions>
    </Card>
  )
}
