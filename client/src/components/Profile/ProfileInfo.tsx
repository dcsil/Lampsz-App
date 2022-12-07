import * as React from 'react'
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
import Container from '@mui/material/Container'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BoyIcon from '@mui/icons-material/Boy'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import FactoryIcon from '@mui/icons-material/Factory'
import TextField from '@mui/material/TextField'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useLoaderData } from 'react-router-dom'

const styles = {
  card: {
    borderRadius: 6,
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

function getDisplayItems (data: any): any[] {
  if (data.user.isInfluencer) {
    return [
      {
        icon: <LocationOnIcon/>,
        label: 'Location',
        value: data.location ? data.location : 'No Location'
      },
      {
        icon: <BoyIcon/>,
        label: 'Age',
        value: data.age ? data.age : 'No data'
      },
      {
        icon: <SubscriptionsIcon/>,
        label: 'Subscribers',
        value: data.subscribers
      },
      {
        icon: <VisibilityIcon/>,
        label: 'Views',
        value: data.views
      }
    ]
  } else {
    return [
      {
        icon: <LocationOnIcon/>,
        label: 'Location',
        value: data.location ? data.location : 'No Location'
      },
      {
        icon: <FactoryIcon/>,
        label: 'Industry',
        value: data.industry ? data.industry : 'No Industry'
      }
    ]
  }
}

export default function ProfileInfo ({ editMode }: { editMode: boolean }): JSX.Element {
  const data = useLoaderData() as any
  const items = getDisplayItems(data)

  return (
    <Card sx={styles.card}>
      <CardContent>
        <Avatar sx={styles.avatar} src={data.thumbnailUrl} alt="avatar"/>
        <Typography sx={styles.heading} variant="h5">
          {data.user.isInfluencer ? data.channelName : data.companyName}
        </Typography>
        <Typography component="span" sx={styles.subheader} variant="h6">
          {data.shortBio ? data.shortBio : 'No Short Bio Provided'}
        </Typography>

        <Divider variant="middle" flexItem sx={{ my: 2 }}/>

        <Container sx={{ textAlign: 'center' }}>
          <List>
            {items.map(({ icon, label, value }) => (
              <ListItem key={label}>
                <ListItemIcon sx={styles.profileStatItem}>
                  {icon}
                </ListItemIcon>
                <ListItemText sx={{ mr: 4 }}>
                  <b>{label}</b>
                </ListItemText>
                {
                  editMode
                    ? <TextField required size="small" id={label} label="Required" defaultValue={value}/>
                    : <Typography variant="body1">{value}</Typography>
                }
              </ListItem>
            ))}
          </List>
        </Container>
      </CardContent>
    </Card>
  )
}
