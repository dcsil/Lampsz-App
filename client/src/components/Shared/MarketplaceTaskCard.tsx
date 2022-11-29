import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { height } from '@mui/system'

interface MarketplaceTaskCardProp {
  title: string
  description: string
  height: string
}



export default function MarketplaceTaskCard ({ title, description, height }: MarketplaceTaskCardProp): JSX.Element {
    const cardStyle = {
    height: height
    };
  return (
    <Card style = {cardStyle} sx={{ width: '100%' }}>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View Details</Button>
      </CardActions>
    </Card>
  )
}
