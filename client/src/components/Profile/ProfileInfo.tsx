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
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'

interface ProfileCardProps {
  name: string
  shortBio?: string
  items: Array<{ icon: JSX.Element, label: string, value: string }>
}

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

export default function ProfileInfo ({ name, shortBio, items }: ProfileCardProps): JSX.Element {
  return (
    <Card sx={styles.card}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs>
            <Avatar sx={styles.avatar} src="" alt="avatar"/>
            <Typography sx={styles.heading} component="h1" variant="h5">
              {name}
            </Typography>
            <Typography component="span" sx={styles.subheader} variant="h6">
              {(shortBio != null) ? shortBio : 'No Short Bio Provided'}
            </Typography>
          </Grid>

          <Divider orientation="vertical" variant="middle" flexItem/>

          <Grid item xs>
            <Container sx={{ textAlign: 'center' }}>
              <List>
                {items.map(({ icon, label, value }) => (
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
