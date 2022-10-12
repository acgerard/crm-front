import { useSelector } from 'react-redux'
import { getClients, getStatus } from '../../redux/client'
import React, { useMemo } from 'react'
import { STATUS } from '../../reducer/common'
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core'

export function ClientPicker(props: {
  clientId: number | null
  label?: string
  canUnset?: boolean
  setClientId: (clientId: number | null) => void
  onBlur?: () => void
}) {
  const [inputValue, setInputValue] = React.useState('')
  const clientStatus = useSelector(getStatus)
  const clients = useSelector(getClients)

  const options = useMemo(() => {
    return clients.map(client => {
      return { label: `${client.data.firstName} ${client.data.lastName}`, id: client.id }
    })
  }, [clients])
  const clientSelected = useMemo(() => options.find(client => client.id === props.clientId), [options, props.clientId])

  return clientStatus === STATUS.OK ? (
    <Autocomplete
      value={clientSelected}
      onChange={(event: unknown, newValue: { id: number; label: string } | null) => {
        props.setClientId(newValue?.id || null)
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      getOptionLabel={option => option.label}
      onBlur={props.onBlur}
      options={options}
      renderInput={params => <TextField {...params} label={props.label || 'Client'} />}
    />
  ) : null
}
