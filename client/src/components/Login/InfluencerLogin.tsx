import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import * as React from 'react'
import { CommonProps } from '../../utils/sharedProps'
import { containerStyle } from '../../utils/sharedStyles'

export default function InfluencerLogin ({ appComponent }: CommonProps): JSX.Element {
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    // influencerLogin(setUserType)
  }

  return (
    <Box sx={containerStyle.centeredBox}>
      <Avatar alt="tiktok logo" src="/static/public/tiktok.png"/>
      <Button onClick={handleClick} size="small" sx={{ marginTop: 1 }}>Login With TikTok</Button>
    </Box>
  )
}
