import React, { useState } from 'react'
import { createProduct } from '../../actions/product-actions'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { useAppDispatch } from '../../store'

export function ProductNewForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dispatch = useAppDispatch()
  const [code, setCode] = useState('')
  const [name, setName] = useState('')

  const handleCreateProduct = () => {
    dispatch(createProduct({ code, name }))
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-product-title">Create Product</DialogTitle>
      <DialogContent className="product-new-dialog">
        <TextField id="product-code" label="Code" value={code} required={true} onChange={e => setCode(e.target.value)} />
        <TextField id="product-name" label="Name" value={name} onChange={e => setName(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button color="primary" onClick={handleCreateProduct}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}
