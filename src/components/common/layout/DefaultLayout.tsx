import React, { ReactElement } from 'react'
import { AppBar, Menu, MenuItem, useScrollTrigger } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import { Menu as MenuIcon } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { ToolbarBreadCrumb } from '../Breadcrumbs/ToolbarBreadCrumb'
import { Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../../../actions/signIn-actions'

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
  },

  content: {
    padding: '0 16px',
  },

  sidebar: {
    display: 'grid',
    height: '100%',
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
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

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

  const onClients = () => {
    navigate('/clients')
    handleClose()
  }
  const onProducts = () => {
    navigate('/products')
    handleClose()
  }
  const onSpancos = () => {
    navigate('/spancos')
    handleClose()
  }

  return (
    <div className={classes.layout}>
      <AppBar elevation={trigger ? 4 : 0}>
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
            <MenuItem onClick={onSpancos}>Spancos</MenuItem>
            <MenuItem onClick={onClients}>Clients</MenuItem>
            <MenuItem onClick={onProducts}>Products</MenuItem>
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

export function SideBar() {
  return <div>RIGHT SIDE BAR</div>
}
