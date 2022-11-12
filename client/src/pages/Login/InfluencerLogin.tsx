import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import * as React from 'react'
import { AuthProps } from '../../utils/sharedProps'

export default function InfluencerLogin (props: AuthProps): JSX.Element {
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    props.setAuth(true)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Avatar alt="tiktok logo" src="/static/public/tiktok.png"/>
      <Button onClick={handleClick} size="small" sx={{ marginTop: 1 }}>Login With TikTok</Button>
    </Box>
  )
}
