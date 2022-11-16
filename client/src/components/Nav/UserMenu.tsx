import { IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import * as React from 'react'
import { AuthProps } from '../../utils/sharedProps'
import { logout } from '../../actions/auth'

export default function UserMenu ({ setAuth }: AuthProps): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleLogout = (): void => {
    logout(setAuth)
    handleClose()
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        size="large"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle/>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Typography textAlign="center" component="a" href="/profile">Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center" component="a" href="/">Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  )
}
