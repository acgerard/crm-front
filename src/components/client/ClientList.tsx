import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultList } from '../common/layout/DefaultList'
import { getError, getFilterClient, getStatus } from '../../selectors/client-selectors'
import { ClientNewDialog } from './ClientNewDialog'
import TextField from '@material-ui/core/TextField'
import { filterClient } from '../../reducer/client-reducer'
import IconButton from '@material-ui/core/IconButton'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { makeStyles } from '@material-ui/core'
import { createClient, fetchClients } from '../../actions/client-actions'
import * as Papa from 'papaparse'
import { ParseResult } from 'papaparse'
import { ClientTable } from './ClientTable'

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'auto 1fr',
    justifyItems: 'end',
    width: '100%',
  },
  input: {
    display: 'none',
  },
}))

function ClientList() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const status = useSelector(getStatus)
  const error = useSelector(getError)
  const filter = useSelector(getFilterClient)

  useEffect(() => {
    dispatch(fetchClients())
  }, [dispatch])

  const handleFile = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const files = Array.from(e.currentTarget.files)
      Papa.parse(files[0], {
        header: true,
        complete: function (results: ParseResult<{ firstName: string; lastName: string; emailPro: string }>) {
          results.data.forEach(line => {
            if (line.firstName && line.lastName && line.emailPro) {
              dispatch(
                createClient({
                  firstName: line.firstName,
                  lastName: line.lastName,
                  emails: { pro: line.emailPro },
                  addresses: {},
                  active: true,
                  newsletter: false,
                }),
              )
            }
          })
        },
      })
    }
  }

  return (
    <DefaultList
      status={status}
      error={error}
      dialog={<ClientNewDialog />}
      toolbar={
        <div className={classes.toolbar}>
          <TextField id="client-search" label="Search" value={filter} onChange={e => dispatch(filterClient(e.target.value))} />
          <div>
            <input accept=".csv" className={classes.input} id="upload-clients" type="file" onChange={handleFile} />
            <label htmlFor="upload-clients">
              <IconButton color="secondary" component="span">
                <CloudUploadIcon />
              </IconButton>
            </label>
          </div>
        </div>
      }
    >
      <ClientTable />
    </DefaultList>
  )
}

export default ClientList
