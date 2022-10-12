import { useSelector } from 'react-redux'
import { filterClients, getClients, getFilterClient } from '../../redux/client'
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

const headColumns = [
  { dataKey: 'firstName', label: 'Prénom', width: 200 },
  { dataKey: 'lastName', label: 'Nom', width: 200 },
  { dataKey: 'active', label: 'Actif', width: 100, boolean: true },
  { dataKey: 'company', label: 'Entreprise', width: 200 },
  { dataKey: 'contact', label: 'Contact DTCF', width: 200 },
  { dataKey: 'dtcf', label: 'DT/CF', width: 100 },
  { dataKey: 'comment', label: 'Commentaire', width: 300 },
]

type ClientElt = {
  id: number
  firstName: string
  lastName: string
  active: boolean
  contact: string
  dtcf: string
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
        dtcf: client.data.dtcfType || '',
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
      <TableCell>{props.dtcf}</TableCell>
      <TableCell>{props.comment}</TableCell>
    </TableRow>
  )
}
