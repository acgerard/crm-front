import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import React from 'react'

export function ConfirmDialog(
  props: React.PropsWithChildren<{
    title: string
    confirmLabel: string
    disabled?: boolean
    open?: boolean
    onClose?: () => void
    onConfirm: () => void
  }>,
) {
  return (
    <Dialog open={props.open || false} onClose={props.onClose} aria-labelledby="form-dialog-title">
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button
          color="primary"
          onClick={() => {
            props.onConfirm()
            props.onClose && props.onClose()
          }}
          disabled={props.disabled}
        >
          {props.confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
