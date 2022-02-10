import { useSelector } from 'react-redux'
import { getClients, getFilterClient } from '../../selectors/client-selectors'
import React, { useMemo } from 'react'
import TableCell from '@material-ui/core/TableCell'
import { Table, TableBody, TableContainer, TableRow } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { stableSort } from '../../helpers/tableHelper'
import { SortableTableHeader } from '../common/table/SortableTableHeader'
import { useOrderBy } from '../../hooks/useOrderBy'
import { useNavigate } from 'react-router-dom'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import { useParams } from 'react-router'
import { Client } from '../../actions/types'

const headColumns = [
  { dataKey: 'firstName', label: 'First Name', width: 200 },
  { dataKey: 'lastName', label: 'Last Name', width: 200 },
  { dataKey: 'active', label: 'Active', width: 100, boolean: true },
  { dataKey: 'company', label: 'Company', width: 200 },
  { dataKey: 'contact', label: 'DTCF Contact', width: 200 },
  { dataKey: 'country', label: 'Country', width: 150 },
  { dataKey: 'comment', label: 'Comment', width: 300 },
]

const filterClients = (clients: Client[], filter?: string) => {
  if (filter && filter !== '') {
    const regex = new RegExp(filter, 'g')
    return clients.filter((client: Client) => {
      return (
        regex.test(client.data.firstName || '') ||
        regex.test(client.data.lastName || '') ||
        regex.test(client.data.comment || '') ||
        regex.test(client.data.company || '') ||
        regex.test(client.data.contact || '') ||
        regex.test(client.data.addresses?.pro?.country || client.data.addresses?.perso?.country || '')
      )
    })
  } else return clients
}

type ClientElt = {
  id: number
  firstName: string
  lastName: string
  active: boolean
  contact: string
  country: string
  comment: string
  company: string
}

export function ClientTable() {
  const params = useParams()
  const clients = useSelector(getClients)
  const filterClient = useSelector(getFilterClient)
  const { order, orderBy, setOrder, setOrderBy, comparator } = useOrderBy(headColumns[0].dataKey)

  const data = useMemo((): ClientElt[] => {
    return filterClients(clients, filterClient).map(client => {
      return {
        id: client.id,
        active: client.data.active,
        firstName: client.data.firstName || '',
        lastName: client.data.lastName || '',
        contact: client.data.contact || '',
        country: client.data.addresses.pro?.country || client.data.addresses.perso?.country || '',
        comment: client.data.comment || '',
        company: client.data.company || '',
      }
    })
  }, [clients, filterClient])

  return (
    <TableContainer component={Paper}>
      <Table>
        <SortableTableHeader columns={headColumns} order={order} orderBy={orderBy} setOrder={setOrder} setOrderBy={setOrderBy} />
        <TableBody>
          {stableSort(data, comparator).map((elt: ClientElt) => (
            <ClientLine key={elt.id} selected={elt.id.toString() === params['clientId']} {...elt} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export function ClientLine(props: { selected?: boolean } & ClientElt) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/clients/${props.id}`)
  }

  return (
    <TableRow key={props.id} hover onClick={handleClick} selected={props.selected}>
      <TableCell component="th" scope="row">
        {props.firstName}
      </TableCell>
      <TableCell>{props.lastName}</TableCell>
      <TableCell>{props.active ? <CheckIcon /> : <ClearIcon />}</TableCell>
      <TableCell>{props.company}</TableCell>
      <TableCell>{props.contact}</TableCell>
      <TableCell>{props.country}</TableCell>
      <TableCell>{props.comment}</TableCell>
    </TableRow>
  )
}
