import * as React from 'react'
import { useEffect } from 'react'
import {useParams} from "react-router-dom"
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import ProfileInfo from './ProfileInfo'
import useAuth from '../../hooks/AuthHook'
import ProfileDescription from './ProfileDescription'
import { containerStyle } from '../../utils/utils'
import { editInfluencerProfile } from '../../actions/profile'
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

export default function InfluencerProfile ({influencer, userId}: any): JSX.Element {
  const auth = useAuth()
  const [editMode, setEditMode] = React.useState(false)
  const items = ["Location", "Industry", "Description"]
  function flipEditMode(){
    setEditMode(!editMode)

  }
  function editRequest(){
    items.forEach((item:string)=>{
      if(item === "Location"){
        influencer[item.toLowerCase()] = {"location": (document.getElementById(item)! as HTMLInputElement).value}
      }else{
        influencer[item.toLowerCase()] = (document.getElementById(item)! as HTMLInputElement).value
      }
    })
    editInfluencerProfile(auth.userId, getCookie("csrftoken"), influencer)
    flipEditMode()
  }
  return (
    <Container component="main" maxWidth="lg" sx={containerStyle.contentContainer}>
    <Box sx={containerStyle.contentBox}>
      <div style={styles.infoContainer}>
        <Grid container spacing={4} direction="column">
          <Grid item xs={4}>
            <ProfileInfo user={influencer} editMode={editMode}/>
          </Grid>
          <Grid item xs={4}>
            <ProfileDescription description={influencer.description} editMode={editMode}/>
          </Grid>
        </Grid>
      </div>
      <div style={styles.contentContainer}>
        <p>Youtube video lists</p>
      </div>
    </Box>
    {userId === auth.userId && (editMode? <div><button onClick={editRequest}>Save</button><button onClick={flipEditMode}>Cancel</button></div>:<button onClick={flipEditMode}>Edit</button>)}
    </Container>
  )
}
