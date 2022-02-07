import React, { useMemo } from 'react'
import Paper from '@material-ui/core/Paper'
import { Table, TableBody, TableContainer, TableRow } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import { stableSort } from '../../helpers/tableHelper'
import { useAppSelector } from '../../store'
import { getProductsById } from '../../selectors/product-selectors'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getSpancos } from '../../selectors/spanco-selectors'
import { SortableTableHeader } from '../common/table/SortableTableHeader'
import { useParams } from 'react-router'
import { useOrderBy } from '../../hooks/useOrderBy'

const headColumns = [
  { dataKey: 'product', label: 'Product' },
  { dataKey: 'promo', label: 'Promo' },
  { dataKey: 'nbOffers', label: 'Number offers' },
]

type SpancoElt = {
  id: number
  product: string
  promo: string
  nbOffers: number
}

export function SpancoTable() {
  const params = useParams()
  const spancos = useSelector(getSpancos)
  const products = useAppSelector(getProductsById)
  const { order, orderBy, setOrder, setOrderBy, comparator } = useOrderBy(headColumns[0].dataKey)

  const data = useMemo((): SpancoElt[] => {
    return spancos.map(spanco => {
      return {
        id: spanco.id,
        product: products[spanco.productId]?.data.code || spanco.productId.toString(),
        promo: spanco.data.promo,
        nbOffers: spanco.nbOffers,
      }
    })
  }, [spancos, products])

  return (
    <TableContainer component={Paper}>
      <Table>
        <SortableTableHeader columns={headColumns} order={order} orderBy={orderBy} setOrder={setOrder} setOrderBy={setOrderBy} />
        <TableBody>
          {stableSort(data, comparator).map((elt: SpancoElt) => (
            <SpancoLine key={elt.id} selected={elt.id.toString() === params['spancoId']} {...elt} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export function SpancoLine(props: { selected?: boolean } & SpancoElt) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/spancos/${props.id}`)
  }

  return (
    <TableRow key={props.id} hover onClick={handleClick} selected={props.selected}>
      <TableCell component="th" scope="row">
        {props.product}
      </TableCell>
      <TableCell>{props.promo}</TableCell>
      <TableCell>{props.nbOffers}</TableCell>
    </TableRow>
  )
}
