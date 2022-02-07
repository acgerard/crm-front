import { useState } from 'react'
import { SortDirection } from '@material-ui/core/TableCell'
import { getComparator } from '../helpers/tableHelper'

export function useOrderBy(initOrderBy: string) {
  const [orderBy, setOrderBy] = useState(initOrderBy)
  const [order, setOrder] = useState<SortDirection>('asc')

  return {
    orderBy,
    order,
    setOrderBy,
    setOrder,
    comparator: getComparator(order, orderBy),
  }
}
