import * as React from 'react'
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import FactoryIcon from '@mui/icons-material/Factory'
import ProfileInfo from './ProfileInfo'
import ProfileDescription from './ProfileDescription'
import { containerStyle } from '../../utils/utils'
import useAuth from '../../hooks/AuthHook'
import { editBusinessProfile } from '../../actions/profile'
import { getCookie } from '../../utils/utils'

const styles = {
  infoContainer:{
    display: 'flex',
    flexGrow: 1,
    overflow: 'auto',
    width: 1/4
  },
  contentContainer:{
    display: 'flex',
    flexGrow: 1,
    overflow: 'auto',
    width: 3/4
  }
}

const items = [
  {
    icon: <LocationOnIcon/>,
    label: 'Location',
    value: 'Toronto, Ontario'
  },
  {
    icon: <FactoryIcon/>,
    label: 'Industry',
    value: 'Food'
  }
]

export default function BusinessProfile ({company, userId}: any): JSX.Element {
  const auth = useAuth()
  const [editMode, setEditMode] = React.useState(false)
  const items = ["Location", "Industry", "Description"]
  function flipEditMode(){
    setEditMode(!editMode)
  }
  function editRequest(){
    items.forEach((item:string)=>{
      company[item.toLowerCase()] = (document.getElementById(item)! as HTMLInputElement).value
    })
    editBusinessProfile(auth.userId, getCookie("csrftoken"), company)
    flipEditMode()
  }
  return (
    <Container component="main" maxWidth="lg" sx={containerStyle.contentContainer}>
    <Box sx={containerStyle.contentBox}>
      <div style={styles.infoContainer}>
        <Grid container spacing={4} direction="column">
          <Grid item xs={4}>
            <ProfileInfo user={company} editMode={editMode}/>
          </Grid>
          <Grid item xs={4}>
            <ProfileDescription description={company.description} editMode={editMode}/>
          </Grid>
        </Grid>
      </div>
      <div style={styles.contentContainer}>
        <p>Old marketing tasks</p>
      </div>
    </Box>
    {parseInt(userId) === parseInt(auth.userId) && (editMode? <div><button onClick={editRequest}>Save</button><button onClick={flipEditMode}>Cancel</button></div>:<button onClick={flipEditMode}>Edit</button>)}
    </Container>
  )
}
