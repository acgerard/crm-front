import React, { useState } from 'react'
import { ConfirmDialog } from '../common/dialog/ConfirmDialog'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getClients } from '../../selectors/client-selectors'
import { createOffer } from '../../actions/spanco-actions'

const useStyles = makeStyles(theme => ({
  container: {
    minWidth: '300px',
    display: 'grid',
    rowGap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

export function OfferNewDialog(props: { spancoId: number; open?: boolean; onClose?: () => void }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const clients = useSelector(getClients)

  const [clientId, setClientId] = useState<number | null>(null)

  const create = () => {
    if (!!clientId) {
      dispatch(createOffer({ spancoId: props.spancoId, data: { clientId: clientId, progress: 0 } }))
    }
  }

  // TODO client picker more usable
  return (
    <ConfirmDialog
      title={'Create Offer'}
      confirmLabel={'Create'}
      open={props.open}
      onClose={props.onClose}
      onConfirm={create}
      disabled={clientId === null}
    >
      <div className={classes.container}>
        <FormControl>
          <InputLabel>Client</InputLabel>
          <Select
            value={clientId}
            onChange={e => {
              if (typeof e.target.value === 'string') {
                setClientId(parseInt(e.target.value))
              } else {
                setClientId(null)
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
          >
            {clients.map(client => (
              <MenuItem key={client.id} value={client.id}>
                {`${client.data.firstName} ${client.data.lastName}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </ConfirmDialog>
  )
}
