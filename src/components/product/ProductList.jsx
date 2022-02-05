import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../actions/product-actions'
import { getNbProducts, getProducts, getProductsError, getProductsStatus } from '../../selectors/product-selectors'
import { STATUS } from '../../reducer/common'
import { FlashMessage } from '../common/flash-message'
import Toolbar from '@material-ui/core/Toolbar'
import AddIcon from '@material-ui/icons/Add'
import { Fab, makeStyles, Typography } from '@material-ui/core'
import { ProductNewForm } from './product-new-form'
import { ProductTable } from './ProductTable'

const useStyles = makeStyles(theme => ({
  container: {
    padding: '0 16px',
    display: 'grid',
    overflowY: 'scroll',
    gridTemplateRows: 'auto 1fr',
    alignItems: 'start',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

function ProductList() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const status = useSelector(getProductsStatus)
  const error = useSelector(getProductsError)
  const [openDialog, setOpenDialog] = React.useState(false)
  const nbProducts = useSelector(getNbProducts)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleOpen = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  return (
    <>
      <div className={classes.container}>
        {status === STATUS.ERROR && <FlashMessage error={error} />}
        <Toolbar />
        <ProductNewForm open={openDialog} onClose={handleClose} />
        {nbProducts === 0 ? <Typography>No products to display</Typography> : <ProductTable />}
      </div>

      <Fab className={classes.fab} color="secondary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
    </>
  )
}

export default ProductList
