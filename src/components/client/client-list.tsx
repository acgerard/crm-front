import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { useDispatch, useSelector } from 'react-redux'
import { getClients, getFilterClient, getSelectedClientId } from '../../selectors/client-selectors'
import { selectClient } from '../../reducer/client-reducer'
import { Client } from '../../actions/types'
import TableCell, { SortDirection } from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'

import './client-list.css'

export function ConnectedClientList() {
  const dispatch = useDispatch()
  const clients = useSelector(getClients)
  const selectedClientId = useSelector(getSelectedClientId)
  const filterClient = useSelector(getFilterClient)

  return (
    <ClientList
      clients={clients}
      selectedClientId={selectedClientId}
      filterClient={filterClient}
      handleSelectClient={(clientId: number) => dispatch(selectClient(clientId))}
    />
  )
}

const headColumns = [
  { dataKey: 'firstName', label: 'First Name', width: 200 },
  { dataKey: 'lastName', label: 'Last Name', width: 200 },
  { dataKey: 'active', label: 'Active', width: 100, boolean: true },
  { dataKey: 'company', label: 'Company', width: 200 },
  { dataKey: 'contact', label: 'DTCF Contact', width: 200 },
  { dataKey: 'country', label: 'Country', width: 150 },
  { dataKey: 'comment', label: 'Comment', width: 300 },
]

// TODO optimize re-render
export function ClientList({
  clients,
  selectedClientId,
  filterClient,
  handleSelectClient,
}: {
  clients: Client[]
  selectedClientId: number | null
  filterClient: string
  handleSelectClient: (clientId: number) => void
}) {
  const [orderBy, setOrderBy] = useState(headColumns[0].dataKey)
  const [order, setOrder] = useState<SortDirection>('asc')

  const handleRequestSort = (property: string) => () => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  function filteredClients() {
    if (filterClient !== '') {
      const regex = new RegExp(filterClient, 'g')
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

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headColumns.map(column => {
              return (
                <TableCell sortDirection={orderBy === column.dataKey ? order : false} key={column.dataKey}>
                  <TableSortLabel
                    active={orderBy === column.dataKey}
                    direction={orderBy === column.dataKey ? (!!order ? order : 'asc') : 'asc'}
                    onClick={handleRequestSort(column.dataKey)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(filteredClients(), getComparator(order, orderBy)).map((client: Client) => {
            const isSelected = client.id === selectedClientId
            return (
              <TableRow key={client.id} hover onClick={() => handleSelectClient(client.id)} selected={isSelected}>
                <TableCell component="th" scope="row">
                  {client.data.firstName}
                </TableCell>
                <TableCell>{client.data.lastName}</TableCell>
                <TableCell>{client.data.active ? <CheckIcon /> : <ClearIcon />}</TableCell>
                <TableCell>{client.data.company}</TableCell>
                <TableCell>{client.data.contact}</TableCell>
                <TableCell>{client.data.addresses?.pro?.country || client.data.addresses?.perso?.country}</TableCell>
                <TableCell>{client.data.comment}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName] // o[propertyName] is of type T[K]
}

function descendingComparator<T>(a: T, b: T, orderBy: string) {
  const valueA = getProperty(a, orderBy as keyof T)
  const valueB = getProperty(b, orderBy as keyof T)
  if (valueB < valueA) {
    return -1
  }
  if (valueB > valueA) {
    return 1
  }
  return 0
}

function getComparator<T>(order: SortDirection, orderBy: string): (a: T, b: T) => number {
  return order === 'desc' ? (a: T, b: T) => descendingComparator(a, b, orderBy) : (a: T, b: T) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(arr: T[], compare: (a: T, b: T) => number) {
  return arr
    .map((item, index) => ({ item, index }))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
    .map(({ item }) => item)
}