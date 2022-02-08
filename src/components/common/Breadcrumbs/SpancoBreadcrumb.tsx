import { useAppSelector } from '../../../store'
import { getSpancoById } from '../../../selectors/spanco-selectors'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { getProductById } from '../../../selectors/product-selectors'

export function SpancoBreadcrumb(props: { id?: string }) {
  const spanco = useAppSelector(state => getSpancoById(state, props.id || ''))
  const product = useAppSelector(state => getProductById(state, spanco?.productId || ''))

  return spanco ? <Typography variant={'h6'}>{`${product?.data.code} - ${spanco.data.promo}`}</Typography> : null
}
