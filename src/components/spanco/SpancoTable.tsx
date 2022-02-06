import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core'
import TableCell, { SortDirection } from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import { getComparator, stableSort } from '../../helpers/tableHelper'
import { useAppSelector } from '../../store'
import { getProductById } from '../../selectors/product-selectors'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Spanco } from '../../actions/types'
import { getSpancoById, getSpancos } from '../../selectors/spanco-selectors'

const headColumns = [
  { dataKey: 'productId', label: 'Product' },
  { dataKey: 'promo', label: 'Promo' },
  { dataKey: 'nbOffers', label: 'Number offers' },
]

export function SpancoTable() {
  const params = useParams()
  const spancos = useSelector(getSpancos)
  const [orderBy, setOrderBy] = useState(headColumns[0].dataKey)
  const [order, setOrder] = useState<SortDirection>('asc')

  const handleRequestSort = (property: string) => () => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
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
          {stableSort(spancos, getComparator(order, orderBy)).map((spanco: Spanco) => (
            <SpancoLine key={spanco.id} id={spanco.id} selected={spanco.id.toString() === params['spancoId']} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export function SpancoLine(props: { id: number; selected: boolean }) {
  const navigate = useNavigate()
  const spanco = useAppSelector(state => getSpancoById(state, props.id))
  const product = useAppSelector(state => getProductById(state, spanco?.productId || -1))

  const handleClick = () => {
    navigate(`/spancos/${props.id}`)
  }

  return spanco ? (
    <TableRow key={props.id} hover onClick={handleClick} selected={props.selected}>
      <TableCell component="th" scope="row">
        {product?.data.code || spanco.productId}
      </TableCell>
      <TableCell>{spanco.data.promo}</TableCell>
      <TableCell>{spanco.nbOffers}</TableCell>
    </TableRow>
  ) : null
}
