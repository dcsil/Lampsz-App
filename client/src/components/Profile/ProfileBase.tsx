import * as React from 'react'
import { useAuth } from '../../hooks/AuthHook'
import { editProfile } from '../../actions/profile'
import Cookies from 'js-cookie'
import Container from '@mui/material/Container'
import { containerStyle } from '../../utils/utils'
import Grid from '@mui/material/Grid'
import { Stack } from '@mui/material'
import ProfileInfo from './ProfileInfo'
import ProfileDescription from './ProfileDescription'
import ProfileContent from './ProfileContent'
import Button from '@mui/material/Button'
import { UserType } from '../../utils/types'

interface ProfileBaseProps {
  items: string[]
  user: any
  userId: number
}

export default function ProfileBase (
  { user, items, userId }: ProfileBaseProps
): JSX.Element {
  const auth = useAuth()
  const [editMode, setEditMode] = React.useState(false)

  const flipEditMode = (): void => {
    setEditMode(!editMode)
  }

  const editRequest = (): void => {
    items.forEach((item: string) => {
      user[item.toLowerCase()] = (document.getElementById(item)! as HTMLInputElement).value
    })
    editProfile(auth.userId, Cookies.get('csrftoken'), user)
    flipEditMode()
  }

  return (
    <Container component="main" maxWidth="lg" sx={containerStyle.contentContainer}>
      <Grid container spacing={2} sx={containerStyle.contentBox}>
        <Grid item md={6}>
          <Stack spacing={3} sx={containerStyle.contentBox}>
            <ProfileInfo user={user} editMode={editMode}/>
            <ProfileDescription description={user.description} editMode={editMode}/>
            <Stack spacing={1} direction="row">
              {userId === auth.userId && (
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
          {user.userType === UserType.INFLUENCER? <p>Youtube videos</p>: <p>My marketing tasks</p>}
          <ProfileContent user={user}/>
        </Grid>
      </Grid>
    </Container>
  )
}
