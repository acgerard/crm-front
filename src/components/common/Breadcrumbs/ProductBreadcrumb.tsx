import { useAppSelector } from '../../../store'
import { getProductById } from '../../../selectors/product-selectors'
import Typography from '@material-ui/core/Typography'
import React from 'react'

export function ProductBreadcrumb(props: { productId?: string }) {
  const product = useAppSelector(state => getProductById(state, props.productId || ''))

  return product ? <Typography variant={'h6'}>{product.data.name}</Typography> : null
}
