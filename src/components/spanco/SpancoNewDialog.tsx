import React, { useState } from 'react'
import { ConfirmDialog } from '../common/dialog/ConfirmDialog'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useAppSelector } from '../../store'
import { getProducts } from '../../selectors/product-selectors'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { createSpanco } from '../../actions/spanco-actions'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    rowGap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

export function SpancoNewDialog(props: { open?: boolean; onClose?: () => void }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const products = useAppSelector(getProducts)
  const [productId, setProductId] = useState<number | null>(null)
  const [promo, setPromo] = useState('')

  const create = () => {
    if (!!productId) {
      dispatch(createSpanco({ productId: productId, spanco: { promo: promo, configuration: { steps: [] } } }))
      setProductId(null)
      setPromo('')
    }
  }

  return (
    <ConfirmDialog
      title={'Créer Spanco'}
      confirmLabel={'Créer'}
      open={props.open}
      onClose={props.onClose}
      onConfirm={create}
      disabled={productId === null || !promo}
    >
      <div className={classes.container}>
        <FormControl>
          <InputLabel>Produit</InputLabel>
          <Select
            value={productId || ''}
            onChange={e => {
              const id = Number(e.target.value)
              if (!isNaN(id)) {
                setProductId(id)
              } else {
                setProductId(null)
              }
            }}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
              getContentAnchorEl: null,
            }}
            required={true}
          >
            {products.map(product => (
              <MenuItem key={product.id} value={product.id}>
                {product.data.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField label="Promo" value={promo} required={true} onChange={e => setPromo(e.target.value)} />
      </div>
    </ConfirmDialog>
  )
}
