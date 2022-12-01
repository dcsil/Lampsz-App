import * as React from 'react'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import ProfileInfo from './ProfileInfo'
import useAuth from '../../hooks/AuthHook'
import ProfileDescription from './ProfileDescription'
import { containerStyle, getCookie } from '../../utils/utils'
import { editInfluencerProfile } from '../../actions/profile'
import { Stack } from '@mui/material'
import Button from '@mui/material/Button'

export default function InfluencerProfile ({ influencer, userId }: any): JSX.Element {
  const auth = useAuth()
  const [editMode, setEditMode] = React.useState(false)
  const items = ['Location', 'Age', 'Subscribers', 'Likes', 'Description']

  const flipEditMode = (): void => {
    setEditMode(!editMode)
  }

  const editRequest = (): void => {
    items.forEach((item: string) => {
      influencer[item.toLowerCase()] = (document.getElementById(item)! as HTMLInputElement).value
    })
    editInfluencerProfile(auth.userId, getCookie('csrftoken'), influencer)
    flipEditMode()
  }

  return (
    <Container component="main" maxWidth="lg" sx={containerStyle.contentContainer}>
      <Grid container spacing={2} sx={containerStyle.contentBox}>
        <Grid item md={6}>
          <Stack spacing={3} sx={containerStyle.contentBox}>
            <ProfileInfo user={influencer} editMode={editMode}/>
            <ProfileDescription description={influencer.description} editMode={editMode}/>
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
          <p>Youtube video lists</p>
        </Grid>
      </Grid>
    </Container>
  )
}
