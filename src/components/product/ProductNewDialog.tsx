import React, { useState } from 'react'
import { createProduct } from '../../actions/product-actions'
import TextField from '@material-ui/core/TextField'
import { useAppDispatch } from '../../store'
import { ConfirmDialog } from '../common/dialog/ConfirmDialog'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    rowGap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

export function ProductNewDialog({ open, onClose }: { open?: boolean; onClose?: () => void }) {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const [code, setCode] = useState('')
  const [name, setName] = useState('')

  const handleCreateProduct = () => {
    dispatch(createProduct({ code, name }))
    setCode('')
    setName('')
  }

  return (
    <ConfirmDialog
      title={'Créer Produit'}
      confirmLabel={'Créer'}
      open={open}
      onClose={onClose}
      onConfirm={handleCreateProduct}
      disabled={code === ''}
    >
      <div className={classes.container}>
        <TextField label="Code" value={code} required={true} onChange={e => setCode(e.target.value)} />
        <TextField label="Nom" value={name} onChange={e => setName(e.target.value)} />
      </div>
    </ConfirmDialog>
  )
}
