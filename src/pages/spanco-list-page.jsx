import { makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { fetchProducts } from '../actions/product-actions'
import { STATUS } from '../reducer/common'
import { FlashMessage } from '../components/flash-message'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { getSpancosError, getSpancosStatus } from '../selectors/spanco-selectors'
import { SpancoList } from '../components/spanco/spanco-list'
import { SpancoNewForm } from '../components/spanco/spanco-new-form'

const useStyles = makeStyles(() => ({
  toolbar: {
    display: 'flex',
    'justify-content': 'flex-end',
  },
}))

function SpancoListPage() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const status = useSelector(getSpancosStatus)
  const error = useSelector(getSpancosError)
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
      <SpancoNewForm open={openDialog} onClose={handleClose} />
      <SpancoList />
    </div>
  )
}

export default SpancoListPage
