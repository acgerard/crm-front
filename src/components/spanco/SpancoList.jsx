import { Fab, makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { fetchProducts } from '../../actions/product-actions'
import { STATUS } from '../../reducer/common'
import { FlashMessage } from '../common/flash-message'
import Toolbar from '@material-ui/core/Toolbar'
import { getSpancosError, getSpancosStatus } from '../../selectors/spanco-selectors'
import { SpancoNewDialog } from './SpancoNewDialog'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
  container: {
    padding: '0 16px',
    display: 'grid',
    overflowY: 'scroll',
  },
  toolbar: {
    display: 'flex',
    'justify-content': 'flex-end',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
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
    <>
      <div className={classes.container}>
        {status === STATUS.ERROR && <FlashMessage error={error} />}
        <Toolbar className={classes.toolbar} />
        <SpancoNewDialog open={openDialog} onClose={handleClose} />
        <div>Under construction</div>
      </div>
      <Fab className={classes.fab} color="secondary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
    </>
  )
}

export default SpancoListPage
