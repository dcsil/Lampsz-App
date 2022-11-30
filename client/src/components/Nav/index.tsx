import { IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import MenuIcon from '@mui/icons-material/Menu'
import * as React from 'react'
import Button from '@mui/material/Button'
import { StyledTitle } from '../Shared/StyledTitle'
import UserMenu from './UserMenu'
import { getNavItems, isAuthenticated } from '../../utils/utils'
import useAuth from '../../hooks/AuthHook'

const styles = {
  xsBox: {
    flexGrow: 1,
    display: {
      xs: 'flex',
      md: 'none'
    }
  },
  lgBox: {
    flexGrow: 1,
    display: {
      xs: 'none',
      md: 'flex'
    }
  },
  navButtons: {
    my: 2,
    color: 'white',
    display: 'block'
  },
  navMenu: {
    display: {
      xs: 'block',
      md: 'none'
    }
  }
}

function NavMenu (
  {
    handleCloseNavMenu, handleOpenNavMenu, anchorElNav
  }: {
    handleCloseNavMenu: VoidFunction
    handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void
    anchorElNav: null | HTMLElement
  }
): JSX.Element {
  const auth = useAuth()
  const navItems = getNavItems(auth.userType)

  return (
    <React.Fragment>
      <StyledTitle isLg={true}/>
      <Box sx={styles.xsBox}>
        <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
          <MenuIcon/>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={styles.navMenu}
        >
          {navItems.map((page) => (
            <MenuItem key={page.name} onClick={handleCloseNavMenu}>
              <Typography textAlign="center" component="a" href={page.href}>{page.name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </React.Fragment>
  )
}

function NavBar ({ handleCloseNavMenu }: { handleCloseNavMenu: VoidFunction }): JSX.Element {
  const auth = useAuth()
  const navItems = getNavItems(auth.userType)

  return (
    <React.Fragment>
      <StyledTitle isLg={false}/>
      <Box sx={styles.lgBox}>
        {navItems.map((page) => (
          <Button
            key={page.name}
            href={page.href}
            onClick={handleCloseNavMenu}
            sx={styles.navButtons}
          >
            {page.name}
          </Button>
        ))}
      </Box>
    </React.Fragment>
  )
}

export default function Nav (): JSX.Element {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const auth = useAuth()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Nav display for smaller screens */}
          <NavMenu
            handleCloseNavMenu={handleCloseNavMenu}
            handleOpenNavMenu={handleOpenNavMenu}
            anchorElNav={anchorElNav}
          />

          {/* Nav display for bigger screens */}
          <NavBar handleCloseNavMenu={handleCloseNavMenu}/>

          {isAuthenticated(auth.userType) && <UserMenu/>}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
