import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core'
import TableCell, { SortDirection } from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import { getComparator, stableSort } from '../../helpers/tableHelper'
import { useAppSelector } from '../../store'
import { getProductById, getProducts } from '../../selectors/product-selectors'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Product } from '../../actions/types'

const headColumns = [
  { dataKey: 'code', label: 'Code' },
  { dataKey: 'name', label: 'Nom' },
]

export function ProductTable() {
  const params = useParams()
  const products = useSelector(getProducts)
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
          {stableSort(products, getComparator(order, orderBy)).map((product: Product) => (
            <ProductLine key={product.id} id={product.id} selected={product.id.toString() === params['*']} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export function ProductLine(props: { id: number; selected: boolean }) {
  const navigate = useNavigate()
  const product = useAppSelector(state => getProductById(state, props.id))

  const handleClick = () => {
    navigate(`/products/${props.id}`)
  }

  return product ? (
    <TableRow key={props.id} hover onClick={handleClick} selected={props.selected}>
      <TableCell component="th" scope="row">
        {product.data.code}
      </TableCell>
      <TableCell>{product.data.name}</TableCell>
    </TableRow>
  ) : null
}
