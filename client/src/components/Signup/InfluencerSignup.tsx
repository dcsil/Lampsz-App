import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { AuthProps } from '../../utils/sharedProps'
import { influencerRegister } from '../../actions/auth'
import { containerStyle } from '../../utils/sharedStyles'

export default function InfluencerSignup ({ setAuth, setUserType }: AuthProps): JSX.Element {
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    influencerRegister(setAuth, setUserType)
  }

  return (
    <Box sx={containerStyle.centeredBox}>
      <Avatar alt="tiktok logo" src="/static/public/tiktok.png"/>
      <Button onClick={handleClick} size="small" sx={{ marginTop: 1 }}>Register With TikTok</Button>
    </Box>
  )
}
