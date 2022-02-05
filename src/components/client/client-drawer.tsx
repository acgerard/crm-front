import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import { useDispatch, useSelector } from 'react-redux'
import { isClientDrawerOpen } from '../../selectors/client-selectors'
import { closeClientDrawer } from '../../reducer/client-reducer'
import { ConnectedClientForm } from './client-form'

export function ClientDrawer() {
  const dispatch = useDispatch()
  const open = useSelector(isClientDrawerOpen)

  const handleClose = (event: { type?: string; key?: string }) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    dispatch(closeClientDrawer())
  }

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <ConnectedClientForm />
    </Drawer>
  )
}
