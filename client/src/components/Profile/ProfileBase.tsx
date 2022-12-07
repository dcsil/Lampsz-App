import * as React from 'react'
import { useAuth } from '../../hooks/AuthHook'
import { editProfile } from '../../actions/profile'
import Container from '@mui/material/Container'
import { containerStyle } from '../../utils/utils'
import Grid from '@mui/material/Grid'
import { Stack } from '@mui/material'
import ProfileInfo from './ProfileInfo'
import ProfileDescription from './ProfileDescription'
import ProfileContent from './ProfileContent'
import Button from '@mui/material/Button'
import { useLoaderData, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'

export default function ProfileBase ({ items }: { items: string[] }): JSX.Element {
  const auth = useAuth()
  const navigate = useNavigate()
  const data = useLoaderData() as any
  const [editMode, setEditMode] = React.useState(false)

  const flipEditMode = (): void => {
    setEditMode(!editMode)
  }

  const editRequest = (event: React.FormEvent): void => {
    event.preventDefault()

    items.forEach((item: string) => {
      const key = item.charAt(0).toLowerCase() + item.slice(1)
      data[key] = (document.getElementById(item)! as HTMLInputElement).value
    })
    editProfile(data.user.id, data, () => {
      flipEditMode()
      navigate(0)
    })
  }

  return (
    <Container component="main" maxWidth="lg" sx={containerStyle.contentContainer}>
      <Grid container spacing={5}>
        <Grid item md={5}>
          <Stack spacing={3} component="form" onSubmit={editRequest}>
            <ProfileInfo editMode={editMode}/>
            <ProfileDescription editMode={editMode}/>
            <Stack spacing={1} direction="row">
              {editMode && <Button type="submit" variant="outlined">Save</Button>}
            </Stack>
          </Stack>
          <Box sx={{ mt: 1 }}>
            {data.user.id === auth.userId && (
              editMode
                ? <Button type="button" variant="outlined" onClick={flipEditMode}>Cancel</Button>
                : <Button type="button" variant="outlined" onClick={flipEditMode}>Edit</Button>
            )}
          </Box>
        </Grid>
        <Grid item md={7}>
          <ProfileContent
            title={data.user.isInfluencer ? 'Youtube Videos' : 'Marketing tasks'}
            link={data.user.isInfluencer ? data.homePage : '/marketplace'}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
