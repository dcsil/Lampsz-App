import { IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import * as React from 'react'
import { logout } from '../../actions/auth'
import useAuth from '../../hooks/AuthHook'

export default function UserMenu (): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const auth = useAuth()

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleLogout = (): void => {
    logout(auth.setUserType, auth.setCsrf)
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
