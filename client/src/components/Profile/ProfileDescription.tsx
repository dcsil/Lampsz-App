import * as React from 'react'
import PanelTitle from '../Shared/PanelTitle'
import { Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField';

interface ProfileDescriptionProps {
  description: string,
  editMode: boolean
}

const styles = {
  card: {
    borderRadius: 12,
    border: '1px solid grey'
  }
}

export default function ProfileDescription ({ description, editMode }: ProfileDescriptionProps): JSX.Element {
  return (
    <Card sx={styles.card}>
      <CardContent>
        <Container>
          <PanelTitle variant="h5">Description</PanelTitle>
          {
          editMode?
          <TextField required id="Description" label="Required" defaultValue={description}/>:
          <Typography component="p" variant="body1">
            {description? description: "No description"}
          </Typography>
          }
        </Container>
      </CardContent>
    </Card>
  )
}
