import React, { useEffect, useState } from 'react'
import { deleteProduct, updateProduct } from '../../actions/product-actions'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core'
import { Product } from '../../actions/types'
import { useAppDispatch } from '../../store'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    display: 'grid',
    gridTemplateRows: 'auto auto auto 1fr',
    rowGap: theme.spacing(2),
  },
  button: {
    justifySelf: 'end',
  },
}))

export function ProductForm({ product }: { product: Product }) {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const [code, setCode] = useState(product.code)
  const [name, setName] = useState(product.name)

  useEffect(() => {
    setCode(product.code)
    setName(product.name)
  }, [product])

  const handleUpdateProduct = () => {
    dispatch(updateProduct({ code, name }))
  }

  return (
    <div className={classes.form}>
      <Button className={classes.button} color="secondary" variant={'contained'} onClick={() => dispatch(deleteProduct(product.code))}>
        <DeleteIcon />
        Delete
      </Button>
      <TextField id="product-code" label="Code" value={code} onChange={e => setCode(e.target.value)} onBlur={handleUpdateProduct} />
      <TextField id="product-name" label="Name" value={name} onChange={e => setName(e.target.value)} onBlur={handleUpdateProduct} />
    </div>
  )
}
