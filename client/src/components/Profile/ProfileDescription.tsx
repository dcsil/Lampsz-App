import * as React from 'react'
import PanelTitle from '../Shared/PanelTitle'
import { Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'

interface ProfileDescriptionProps {
  description: string
}

const styles = {
  card: {
    borderRadius: 12,
    border: '1px solid grey'
  }
}

export default function ProfileDescription ({ description }: ProfileDescriptionProps): JSX.Element {
  return (
    <Card sx={styles.card}>
      <CardContent>
        <Container>
          <PanelTitle variant="h5">Description</PanelTitle>
          <Typography component="p" variant="body1">
            {description}
          </Typography>
        </Container>
      </CardContent>
    </Card>
  )
}
