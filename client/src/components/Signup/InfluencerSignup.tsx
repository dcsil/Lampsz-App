import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { containerStyle } from '../../utils/sharedStyles'
import { CommonProps } from '../../utils/types'

export default function InfluencerSignup ({ appComponent }: CommonProps): JSX.Element {
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    // influencerRegister(setUserType)
  }

  return (
    <Box sx={containerStyle.centeredBox}>
      <Avatar alt="tiktok logo" src="/static/public/tiktok.png"/>
      <Button onClick={handleClick} size="small" sx={{ marginTop: 1 }}>Register With TikTok</Button>
    </Box>
  )
}
