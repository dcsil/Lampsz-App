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
import { UserType } from '../../utils/types'

interface ProfileBaseProps {
  items: string[]
  user: any
  userId: number
}

export default function ProfileBase ({ user, items, userId }: ProfileBaseProps): JSX.Element {
  const auth = useAuth()
  const [editMode, setEditMode] = React.useState(false)

  const flipEditMode = (): void => {
    setEditMode(!editMode)
  }

  const editRequest = (): void => {
    items.forEach((item: string) => {
      user[item.toLowerCase()] = (document.getElementById(item)! as HTMLInputElement).value
    })
    editProfile(auth.userId, user)
    flipEditMode()
  }

  return (
    <Container component="main" maxWidth="lg" sx={containerStyle.contentContainer}>
      <Grid container spacing={5}>
        <Grid item md={5}>
          <Stack spacing={3}>
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
        <Grid item md={7}>
          <ProfileContent
            user={user}
            title={user.userType === UserType.INFLUENCER ? 'Youtube Videos' : 'Marketing tasks'}
            link={user.userId === UserType.INFLUENCER ? user.homePage : '/marketplace'}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
