import { SortDirection } from '@material-ui/core/TableCell'

export function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName] // o[propertyName] is of type T[K]
}

export function descendingComparator<T>(a: T, b: T, orderBy: string) {
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

export function getComparator<T>(order: SortDirection, orderBy: string): (a: T, b: T) => number {
  return order === 'desc' ? (a: T, b: T) => descendingComparator(a, b, orderBy) : (a: T, b: T) => -descendingComparator(a, b, orderBy)
}

export function stableSort<T>(arr: T[], compare: (a: T, b: T) => number) {
  return arr
    .map((item, index) => ({ item, index }))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
    .map(({ item }) => item)
}
