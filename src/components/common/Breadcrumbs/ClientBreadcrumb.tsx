import { useAppSelector } from '../../../store'
import { getClientById } from '../../../selectors/client-selectors'
import Typography from '@material-ui/core/Typography'
import React from 'react'

export function ClientBreadcrumb(props: { clientId?: string }) {
  const client = useAppSelector(state => getClientById(state, props.clientId || -1))

  return <>{client ? <Typography>{`${client.data.firstName} ${client.data.lastName}`}</Typography> : null}</>
}
