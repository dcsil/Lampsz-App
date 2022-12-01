import * as React from 'react'
import { UserType } from '../../utils/types'
import { Theme } from '@mui/material'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BoyIcon from '@mui/icons-material/Boy'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import FactoryIcon from '@mui/icons-material/Factory'

const styles = {
  card: {
    borderRadius: 12,
    textAlign: 'center',
    border: '1px solid grey'
  },
  avatar: {
    width: 150,
    height: 150,
    margin: 'auto'
  },
  heading: {
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 4,
    marginBottom: 1
  },
  subheader: {
    color: (theme: Theme) => theme.palette.grey[500],
    marginBottom: 1,
    marginTop: 1,
    fontSize: '105%'
  },
  profileStatItem: {
    minWidth: '40px'
  }
}

export default function ProfileInfo ({user}: any): JSX.Element {
  var items;
  if(user.userType === UserType.INFLUENCER){
    items = [
      {
        icon: <LocationOnIcon/>,
        label: 'Location',
        value: user.location.location
      },
      {
        icon: <BoyIcon/>,
        label: 'Age',
        value: user.age
      },
      {
        icon: <SubscriptionsIcon/>,
        label: 'Subscribers',
        value: user.subscribers
      },
      {
        icon: <ThumbUpIcon/>,
        label: 'Likes',
        value: user.likes
      }
    ]
  }else{
    items = [
      {
        icon: <LocationOnIcon/>,
        label: 'Location',
        value: user.location.location
      },
      {
        icon: <FactoryIcon/>,
        label: 'Industry',
        value: user.industry
      }
    ]
  }
  return (
    <Card sx={styles.card}>
      <CardContent>
        <Grid container spacing={2} direction="column">
          <Grid item xs>
            <Avatar sx={styles.avatar} src="" alt="avatar"/>
            <Typography sx={styles.heading} component="h1" variant="h5">
              {user.name}
            </Typography>
            <Typography component="span" sx={styles.subheader} variant="h6">
              {(user.shortBio != null) ? user.shortBio : 'No Short Bio Provided'}
            </Typography>
          </Grid>

          <Divider orientation="horizontal" variant="middle" flexItem/>

          <Grid item xs>
            <Container sx={{ textAlign: 'center' }}>
              <List>
                {items.map(({icon, label, value}) => (
                  <ListItem key={label}>
                    <ListItemIcon sx={styles.profileStatItem}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText>
                      <b>{label}</b>
                    </ListItemText>
                    <Typography component="p" variant="body1">{value}</Typography>
                  </ListItem>
                ))}
              </List>
            </Container>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
