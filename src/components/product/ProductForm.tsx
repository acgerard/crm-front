import React, { useEffect, useState } from 'react'
import { deleteProduct, updateProduct } from '../../actions/product-actions'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core'
import { Product } from '../../actions/types'
import { useAppDispatch } from '../../store'
import Button from '@material-ui/core/Button'
import { DefaultSidebar } from '../common/layout/DefaultSidebar'
import { useNavigate } from 'react-router-dom'
import { ConfirmDialog } from '../common/dialog/ConfirmDialog'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    display: 'grid',
    gridTemplateRows: 'auto auto 1fr',
    rowGap: theme.spacing(2),
  },
  button: {
    justifySelf: 'end',
  },
}))

export function ProductForm({ product }: { product: Product }) {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [code, setCode] = useState(product.data.code)
  const [name, setName] = useState(product.data.name)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setCode(product.data.code)
    setName(product.data.name)
  }, [product])

  const handleUpdateProduct = () => {
    dispatch(updateProduct({ id: product.id, data: { code, name } }))
  }
  const handleDelete = () => {
    dispatch(deleteProduct(product.id))
  }

  const backToProducts = () => {
    navigate(`/products`)
  }

  return (
    <DefaultSidebar
      name={product?.data.name}
      backAction={backToProducts}
      toolbarActions={
        <Button color="secondary" variant={'contained'} startIcon={<DeleteIcon />} onClick={() => setShowModal(true)}>
          Supprimer
        </Button>
      }
    >
      <div className={classes.form}>
        <TextField id="product-code" label="Code" value={code} onChange={e => setCode(e.target.value)} onBlur={handleUpdateProduct} />
        <TextField id="product-name" label="Nom" value={name} onChange={e => setName(e.target.value)} onBlur={handleUpdateProduct} />
      </div>
      <ConfirmDialog
        open={showModal}
        title={'Supprimer produit'}
        confirmLabel={'Supprimer'}
        onConfirm={handleDelete}
        onClose={() => setShowModal(false)}
      >
        <Typography>
          Cette action est définitive et supprimera le produit. Cela échouera si le produit est utilisé dans un spanco.
        </Typography>
      </ConfirmDialog>
    </DefaultSidebar>
  )
}
