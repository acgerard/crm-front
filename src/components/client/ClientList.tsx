import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {DefaultList} from '../common/layout/DefaultList'
import {
  createClients,
  CsvClient,
  exportClients,
  fetchClients,
  filterClient,
  getClientsCount,
  getError,
  getFilterClient,
  getStatus,
} from '../../redux/client'
import {ClientNewDialog} from './ClientNewDialog'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import {ListItemIcon, makeStyles, Menu, MenuItem, Snackbar} from '@material-ui/core'
import * as Papa from 'papaparse'
import {ParseResult} from 'papaparse'
import {ClientTable} from './ClientTable'
import Typography from '@material-ui/core/Typography'
import {ClientData} from '../../actions/types'
import {useAppDispatch} from '../../store'
import {GetApp} from '@material-ui/icons'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PublishIcon from '@material-ui/icons/Publish'
import {AnyAction} from "@reduxjs/toolkit";

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'auto 1fr',
    justifyItems: 'end',
    width: '100%',
  },
  actions: {
    display: 'grid',
    gridAutoFlow: 'column',
    columnGap: '2rem',
    alignItems: 'center',
  },
  input: {
    display: 'none',
  },
}))

function ClientList() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const status = useSelector(getStatus)
  const error = useSelector(getError)
  const filter = useSelector(getFilterClient)
  const nbClients = useSelector(getClientsCount)
  const [importData, setImportData] = useState<{ count: number; duplicated: number } | null>(null)
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  useEffect(() => {
    dispatch(fetchClients())
  }, [dispatch])

  const handleActionsOpen = (event: { currentTarget: HTMLElement }) => {
    setAnchorEl(event.currentTarget)
  }
  const handleActionsClose = () => {
    setAnchorEl(null)
  }

  const handleFile = async (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const files = Array.from(e.currentTarget.files)
      Papa.parse(files[0], {
        header: true,
        complete: async function (results: ParseResult<CsvClient>) {
          const clients: ClientData[] = []
          results.data.forEach(line => {
            if (line.firstName || line.lastName) {
              clients.push({
                firstName: line.firstName,
                lastName: line.lastName,
                emails: { pro: line.email, perso: line.emailPerso },
                phone: line.phone,
                company: line.company,
                contact: line.contact,
                dtcfType: line.dtcfType,
                comment: line.comment,
                title: line.title,
                addresses: {},
                active: true,
                newsletter: !!line.newsletter,
              })
            }
          })
          const res = await dispatch(createClients(clients))
          setImportData((res as AnyAction).payload)
          dispatch(fetchClients())
        },
      })
    }
  }

  const handleExport = () => {
    dispatch(exportClients())
  }

  const handleCloseSnackbar = () => {
    setImportData(null)
  }

  return (
    <DefaultList
      status={status}
      error={error}
      dialog={<ClientNewDialog />}
      toolbar={
        <div className={classes.toolbar}>
          <TextField id="client-search" label="Rechercher" value={filter} onChange={e => dispatch(filterClient(e.target.value))} />
          <div className={classes.actions}>
            {nbClients > 0 && <Typography>{`${nbClients} Clients`}</Typography>}
            <IconButton id="basic-button" color="primary" component="span" onClick={handleActionsOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              keepMounted
              open={!!anchorEl}
              onClose={handleActionsClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              getContentAnchorEl={null}
            >
              <input accept=".csv" className={classes.input} id="upload-clients" type="file" onChange={handleFile} />
              <label htmlFor="upload-clients">
                <MenuItem onClick={handleActionsClose}>
                  <ListItemIcon>
                    <PublishIcon color={'primary'} />
                  </ListItemIcon>
                  <Typography>Import</Typography>
                </MenuItem>
              </label>
              <MenuItem
                onClick={() => {
                  handleActionsClose()
                  handleExport()
                }}
              >
                <ListItemIcon>
                  <GetApp color={'primary'} />
                </ListItemIcon>
                <Typography>Export</Typography>
              </MenuItem>
            </Menu>
          </div>
        </div>
      }
    >
      <ClientTable />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={importData != null}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={
          importData
            ? importData.duplicated > 0
              ? `${importData.count} clients importés, ${importData.duplicated} déjà existants ignorés`
              : `${importData.count} clients importés`
            : ''
        }
      />
    </DefaultList>
  )
}

export default ClientList
