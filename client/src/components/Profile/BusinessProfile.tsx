import * as React from 'react'
import Container from '@mui/material/Container'
import ProfileInfo from './ProfileInfo'
import ProfileDescription from './ProfileDescription'
import { containerStyle, getCookie } from '../../utils/utils'
import useAuth from '../../hooks/AuthHook'
import { editBusinessProfile } from '../../actions/profile'
import Button from '@mui/material/Button'
import { Stack } from '@mui/material'
import Grid from '@mui/material/Grid'

export default function BusinessProfile ({ company, userId }: any): JSX.Element {
  const auth = useAuth()
  const [editMode, setEditMode] = React.useState(false)
  const items = ['Location', 'Industry', 'Description']

  const flipEditMode = (): void => {
    setEditMode(!editMode)
  }

  const editRequest = (): void => {
    items.forEach((item: string) => {
      company[item.toLowerCase()] = (document.getElementById(item)! as HTMLInputElement).value
    })
    editBusinessProfile(auth.userId, getCookie('csrftoken'), company)
    flipEditMode()
  }

  return (
    <Container component="main" maxWidth="lg" sx={containerStyle.contentContainer}>
      <Grid container spacing={2} sx={containerStyle.contentBox}>
        <Grid item md={6}>
          <Stack spacing={3} sx={containerStyle.contentBox}>
            <ProfileInfo user={company} editMode={editMode}/>
            <ProfileDescription description={company.description} editMode={editMode}/>
            <Stack spacing={1} direction="row">
              {parseInt(userId) === parseInt(auth.userId) && (
                editMode
                  ? <React.Fragment>
                    <Button variant="outlined" onClick={editRequest}>Save</Button>
                    <Button variant="outlined" onClick={flipEditMode}>Cancel</Button>
                  </React.Fragment>
                  : <Button variant="outlined" onClick={flipEditMode}>Edit</Button>
              )}
            </Stack>
          </Stack>
        </Grid>
        <Grid item md={6}>
          <p>Old marketing tasks</p>
        </Grid>
      </Grid>
    </Container>
  )
}
