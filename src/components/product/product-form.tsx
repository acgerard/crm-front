import React, { useState } from 'react'
import { deleteProduct, updateProduct } from '../../actions/product-actions'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core'
import { Product } from '../../actions/types'
import { useAppDispatch } from '../../store'

const useStyles = makeStyles(() => ({
  form: {
    width: '100%',
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'space-between',
  },
  field: {
    'margin-right': '1rem',
  },
}))

export function ProductForm({ product }: { product: Product }) {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const [code, setCode] = useState(product.code)
  const [name, setName] = useState(product.name)

  const handleUpdateProduct = () => {
    dispatch(updateProduct({ code, name }))
  }

  return (
    <div className={classes.form}>
      <div>
        <TextField
          id="product-code"
          className={classes.field}
          label="Code"
          value={code}
          onChange={e => setCode(e.target.value)}
          onBlur={handleUpdateProduct}
        />
        <TextField
          id="product-name"
          className={classes.field}
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={handleUpdateProduct}
        />
      </div>
      <IconButton color="primary" onClick={() => dispatch(deleteProduct(product.code))}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
