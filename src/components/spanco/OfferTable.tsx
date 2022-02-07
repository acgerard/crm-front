import React, { useMemo } from 'react'
import Paper from '@material-ui/core/Paper'
import { Table, TableBody, TableContainer, TableRow } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import { stableSort } from '../../helpers/tableHelper'
import { useAppSelector } from '../../store'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getOffers } from '../../selectors/spanco-selectors'
import { SortableTableHeader } from '../common/table/SortableTableHeader'
import { useParams } from 'react-router'
import { getClientName, getClientsById } from '../../selectors/client-selectors'
import { useOrderBy } from '../../hooks/useOrderBy'

const headColumns = [
  { dataKey: 'client', label: 'Client' },
  { dataKey: 'action', label: 'Action' },
  { dataKey: 'followedBy', label: 'Followed by' },
  { dataKey: 'progress', label: 'Progress' },
]

type OfferElt = {
  id: number
  spancoId: number
  client: string
  action?: string
  followedBy?: string
  progress: string
}

export function OfferTable() {
  const params = useParams()
  const offers = useSelector(getOffers)
  const clients = useAppSelector(getClientsById)
  const { order, orderBy, setOrder, setOrderBy, comparator } = useOrderBy(headColumns[0].dataKey)

  const data = useMemo((): OfferElt[] => {
    return offers.map(offer => {
      return {
        id: offer.id,
        spancoId: offer.spancoId,
        action: offer.data.action,
        client: getClientName(clients[offer.data.clientId || offer.data.prescriptorId || 0]) || 'Not found',
        followedBy: offer.data.followedBy,
        progress: offer.data.progress.toString(),
      }
    })
  }, [offers, clients])

  return (
    <TableContainer component={Paper}>
      <Table>
        <SortableTableHeader columns={headColumns} order={order} orderBy={orderBy} setOrder={setOrder} setOrderBy={setOrderBy} />
        <TableBody>
          {stableSort(data, comparator).map((elt: OfferElt) => (
            <OfferLine key={elt.id} {...elt} selected={elt.id.toString() === params['offerId']} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export function OfferLine(props: { selected?: boolean } & OfferElt) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/spancos/${props.spancoId}/${props.id}`)
  }

  return (
    <TableRow key={props.id} hover onClick={handleClick} selected={props.selected}>
      <TableCell component="th" scope="row">
        {props.client}
      </TableCell>
      <TableCell>{props.action}</TableCell>
      <TableCell>{props.followedBy}</TableCell>
      <TableCell>{props.progress}</TableCell>
    </TableRow>
  )
}
