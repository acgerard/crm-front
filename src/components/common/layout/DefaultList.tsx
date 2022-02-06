import { Fab, makeStyles } from '@material-ui/core'
import React, { ReactElement, ReactNode, useState } from 'react'
import { STATUS } from '../../../reducer/common'
import { FlashMessage } from '../flash-message'
import Toolbar from '@material-ui/core/Toolbar'
import AddIcon from '@material-ui/icons/Add'
import { SerializedError } from '@reduxjs/toolkit'

const useStyles = makeStyles(theme => ({
  container: {
    padding: '0 16px',
    display: 'grid',
    overflowY: 'scroll',
    gridTemplateRows: 'auto auto 1fr',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

export function DefaultList(
  props: React.PropsWithChildren<{ toolbar?: ReactNode; status: string; error: SerializedError | null; dialog?: ReactElement }>,
) {
  const classes = useStyles()
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpen = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  return (
    <>
      <div className={classes.container}>
        <FlashMessage error={props.error} />
        <Toolbar>{props.toolbar}</Toolbar>
        {props.status !== STATUS.INIT && props.children}
      </div>
      {props.dialog && React.cloneElement(props.dialog, { open: openDialog, onClose: handleClose })}
      <Fab className={classes.fab} color="secondary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
    </>
  )
}
