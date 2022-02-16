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
  const [code, setCode] = useState(product.data.code)
  const [name, setName] = useState(product.data.name)

  useEffect(() => {
    setCode(product.data.code)
    setName(product.data.name)
  }, [product])

  const handleUpdateProduct = () => {
    dispatch(updateProduct({ id: product.id, data: { code, name } }))
  }

  return (
    <div className={classes.form}>
      <Button
        className={classes.button}
        color="secondary"
        variant={'contained'}
        startIcon={<DeleteIcon />}
        onClick={() => dispatch(deleteProduct(product.id))}
      >
        Supprimer
      </Button>
      <TextField id="product-code" label="Code" value={code} onChange={e => setCode(e.target.value)} onBlur={handleUpdateProduct} />
      <TextField id="product-name" label="Nom" value={name} onChange={e => setName(e.target.value)} onBlur={handleUpdateProduct} />
    </div>
  )
}
