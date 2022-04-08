import React, { ReactElement } from 'react'
import { AppBar, Link, Menu, MenuItem } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import { Menu as MenuIcon } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { ToolbarBreadCrumb } from '../Breadcrumbs/ToolbarBreadCrumb'
import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../../../redux/authentication'
import { SideBar } from '../../Sidebar/SideBar'

const useStyles = makeStyles(theme => ({
  layout: {
    height: '100vh',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
  },

  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 450px',
    gridAutoFlow: 'column',
    height: '100%',
    overflowY: 'hidden',
  },

  content: {
    display: 'grid',
    height: '100%',
    position: 'relative',
    overflowY: 'hidden',
  },
  sidebar: {
    padding: theme.spacing(2),
    display: 'grid',
    height: '100%',
    overflowY: 'scroll',
    backgroundColor: '#f5f3f2',
  },
  toolbar: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'auto 1fr auto',
  },
  menu: {
    display: 'grid',
    rowGap: '8px',
  },
}))

export function DefaultLayout(): ReactElement {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const handleClick = (event: { currentTarget: HTMLElement }) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const onLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className={classes.layout}>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <IconButton id="menu-button" size="medium" edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="main-menu"
            anchorReference={'anchorPosition'}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorPosition={{
              top: 50,
              left: 0,
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link component={RouterLink} to={'/clients'} underline={'none'} color={'inherit'}>
                Clients
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link component={RouterLink} to={'/spancos'} underline={'none'} color={'inherit'}>
                Spancos
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link component={RouterLink} to={'/products'} underline={'none'} color={'inherit'}>
                Produits
              </Link>
            </MenuItem>
          </Menu>
          <ToolbarBreadCrumb />
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <div className={classes.container}>
        <div className={classes.content}>
          <Outlet />
        </div>
        <div className={classes.sidebar}>
          <SideBar />
        </div>
      </div>
    </div>
  )
}
