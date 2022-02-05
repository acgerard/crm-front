import { useAppSelector } from '../../../store'
import { getProductByCode } from '../../../selectors/product-selectors'
import { Link as RouterLink, useParams } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { Link } from '@material-ui/core'

export function ProductBreadcrumb() {
  const { productCode } = useParams<{ productCode?: string }>()
  const product = useAppSelector(state => getProductByCode(state, productCode || ''))

  return (
    <>
      <Link component={RouterLink} to={'/products'} underline={'none'} color={'inherit'}>
        Products
      </Link>
      {product ? <Typography>{productCode}</Typography> : null}
    </>
  )
}
