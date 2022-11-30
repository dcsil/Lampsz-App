import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'

const styles = {
  avatar: {
    m: 1,
    bgcolor: 'secondary.main'
  },
  title: {
    mb: 3
  }
}

export default function AuthTitle ({ title }: { title: string }): JSX.Element {
  return (
    <React.Fragment>
      <Avatar sx={styles.avatar}>
        <LockOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h5" sx={styles.title}>
        {title}
      </Typography>
    </React.Fragment>
  )
}
