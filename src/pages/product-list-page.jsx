import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../actions/product-actions'
import { getProductsError, getProductsStatus } from '../selectors/product-selectors'
import { STATUS } from '../reducer/common'
import { FlashMessage } from '../components/flash-message'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { makeStyles } from '@material-ui/core'
import { ProductList } from '../components/product/product-list'
import { ProductNewForm } from '../components/product/product-new-form'

const useStyles = makeStyles(() => ({
  toolbar: {
    display: 'flex',
    'justify-content': 'flex-end',
  },
}))

function ProductListPage() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const status = useSelector(getProductsStatus)
  const error = useSelector(getProductsError)
  const [openDialog, setOpenDialog] = React.useState(false)

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
    <div>
      {status === STATUS.ERROR && <FlashMessage error={error} />}
      <Toolbar className={classes.toolbar}>
        <IconButton color="primary" onClick={handleOpen}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Toolbar>
      <ProductNewForm open={openDialog} onClose={handleClose} />
      <ProductList />
    </div>
  )
}

export default ProductListPage
