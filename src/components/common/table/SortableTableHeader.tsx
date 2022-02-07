import React from 'react'
import { TableHead, TableRow } from '@material-ui/core'
import TableCell, { SortDirection } from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'

export function SortableTableHeader(props: {
  columns: { dataKey: string; label: string }[]
  orderBy: string
  setOrderBy: (orderBy: string) => void
  order: SortDirection
  setOrder: (order: SortDirection) => void
}) {
  const handleRequestSort = (property: string) => () => {
    const isAsc = props.orderBy === property && props.order === 'asc'
    props.setOrder(isAsc ? 'desc' : 'asc')
    props.setOrderBy(property)
  }

  return (
    <TableHead>
      <TableRow>
        {props.columns.map(column => {
          return (
            <TableCell sortDirection={props.orderBy === column.dataKey ? props.order : false} key={column.dataKey}>
              <TableSortLabel
                active={props.orderBy === column.dataKey}
                direction={props.orderBy === column.dataKey ? (!!props.order ? props.order : 'asc') : 'asc'}
                onClick={handleRequestSort(column.dataKey)}
              >
                {column.label}
              </TableSortLabel>
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}
