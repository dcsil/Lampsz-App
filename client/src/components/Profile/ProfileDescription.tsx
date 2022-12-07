import * as React from 'react'
import { Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import { useLoaderData } from 'react-router-dom'

export default function ProfileDescription ({ editMode }: { editMode: boolean }): JSX.Element {
  const { description } = useLoaderData() as any

  return (
    <Card sx={{ borderRadius: 6, border: '1px solid grey' }}>
      <CardContent>
        <Container>
          <Typography variant="h5" color="primary" gutterBottom>Description</Typography>
          {editMode
            ? <TextField
              id="Description" label="Required" defaultValue={description}
              multiline rows={4} required fullWidth
            />
            : <Typography variant="body1">
              {description || 'No description'}
            </Typography>
          }
        </Container>
      </CardContent>
    </Card>
  )
}
