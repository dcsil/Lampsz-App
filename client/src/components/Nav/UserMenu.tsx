import { IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import * as React from 'react'
import { useAuth } from '../../hooks/AuthHook'
import { useNavigate } from 'react-router-dom'
import useToast from '../../hooks/ToastHook'

export default function UserMenu (): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const auth = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton size="large" onClick={handleMenu} color="inherit">
        <AccountCircle/>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Typography textAlign="center" component="a" href={`/profile/${auth.userId}`}>Profile</Typography>
        </MenuItem>
        <MenuItem onClick={() => {
          auth.logout(() => {
            navigate('/')
            toast.getToastMessage()
          })
          handleClose()
        }}>
          <Typography textAlign="center" component="a">Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  )
}
