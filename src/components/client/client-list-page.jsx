import React, { useEffect } from 'react'
import { ConnectedClientList } from './client-list'
import { createClient, fetchClients } from '../../actions/client-actions'
import { FlashMessage } from '../common/flash-message'
import { useDispatch, useSelector } from 'react-redux'
import { getError, getFilterClient, getStatus } from '../../selectors/client-selectors'
import { filterClient } from '../../reducer/client-reducer'
import IconButton from '@material-ui/core/IconButton'
import { ConnectedClientNewForm } from './client-new-form'
import { Fab, makeStyles } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import * as Papa from 'papaparse'
import { ClientDrawer } from './client-drawer'
import Toolbar from '@material-ui/core/Toolbar'
import TextField from '@material-ui/core/TextField'
import { STATUS } from '../../reducer/common'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
  container: {
    padding: '0 16px',
    display: 'grid',
    overflowY: 'scroll',
    gridTemplateRows: 'auto 1fr',
  },
  buttons: {
    display: 'flex',
    'justify-content': 'flex-end',
  },
  toolbar: {
    display: 'flex',
    'justify-content': 'space-between',
  },
  input: {
    display: 'none',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

function ClientListPage() {
  const classes = useStyles()
  const status = useSelector(getStatus)
  const error = useSelector(getError)
  const filter = useSelector(getFilterClient)
  const dispatch = useDispatch()
  const [openDialog, setOpenDialog] = React.useState(false)

  const handleOpen = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  useEffect(() => {
    dispatch(fetchClients())
  }, [dispatch])

  const handleFile = e => {
    const files = Array.from(e.target.files)
    Papa.parse(files[0], {
      header: true,
      complete: function (results) {
        results.data.forEach(line => {
          if (line.firstName && line.lastName && line.emailPro) {
            dispatch(createClient({ firstName: line.firstName, lastName: line.lastName, emails: { pro: line.email } }))
          }
        })
      },
    })
  }

  return (
    <>
      <div className={classes.container}>
        {status === STATUS.ERROR && <FlashMessage error={error} />}
        <Toolbar className={classes.toolbar}>
          <TextField id="client-search" label="Search" value={filter} onChange={e => dispatch(filterClient(e.target.value))} />
          <div className={classes.buttons}>
            <input accept=".csv" className={classes.input} id="upload-clients" type="file" onChange={handleFile} />
            <label htmlFor="upload-clients">
              <IconButton color="secondary" component="span">
                <CloudUploadIcon />
              </IconButton>
            </label>
          </div>
        </Toolbar>
        <ConnectedClientNewForm open={openDialog} onClose={handleClose} />
        <ClientDrawer />
        <ConnectedClientList />
      </div>
      <Fab className={classes.fab} color="secondary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
    </>
  )
}

export default ClientListPage
