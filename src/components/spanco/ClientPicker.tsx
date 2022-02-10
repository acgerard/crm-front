import { useSelector } from 'react-redux'
import { getClients, getStatus } from '../../selectors/client-selectors'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import { STATUS } from '../../reducer/common'

export function ClientPicker(props: {
  clientId: number | null
  label?: string
  canUnset?: boolean
  setClientId: (clientId: number | null) => void
  onBlur?: () => void
}) {
  const clientStatus = useSelector(getStatus)
  const clients = useSelector(getClients)

  return clientStatus === STATUS.OK ? (
    <FormControl>
      <InputLabel>{props.label || 'Client'}</InputLabel>
      <Select
        value={props.clientId?.toString() || ''}
        onChange={e => {
          if (typeof e.target.value === 'string') {
            const value = parseInt(e.target.value)
            if (isNaN(value)) {
              props.setClientId(null)
            } else {
              props.setClientId(value)
            }
          } else {
            props.setClientId(null)
          }
        }}
        onBlur={props.onBlur}
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
        {props.canUnset && (
          <MenuItem key={'unsetValue'} value={''}>
            None
          </MenuItem>
        )}
        {clients.map(client => (
          <MenuItem key={client.id} value={client.id.toString()}>
            {`${client.data.firstName} ${client.data.lastName}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : null
}
