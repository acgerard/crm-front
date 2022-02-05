import { useAppSelector } from '../../../store'
import { getClientById } from '../../../selectors/client-selectors'
import { Link as RouterLink, useParams } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { Link } from '@material-ui/core'

export function ClientBreadcrumb() {
  const { clientId } = useParams<{ clientId?: string }>()
  const client = useAppSelector(state => getClientById(state, clientId || -1))

  return (
    <>
      <Link component={RouterLink} to={'/clients'} underline={'none'} color={'inherit'}>
        Clients
      </Link>
      {client ? <Typography>{`${client.data.firstName} ${client.data.lastName}`}</Typography> : null}
    </>
  )
}
