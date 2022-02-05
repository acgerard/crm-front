import { getSpancoId } from '../../../reducer/spanco-reducer'
import { useAppSelector } from '../../../store'
import { getSpancoByPromoAndCode } from '../../../selectors/spanco-selectors'
import { Link as RouterLink, useParams } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { Link } from '@material-ui/core'

export function SpancoBreadcrumb() {
  const { productCode, promo } = useParams<{ productCode?: string; promo?: string }>()
  const spancoId = getSpancoId(productCode || '', promo || '')
  const spanco = useAppSelector(state => getSpancoByPromoAndCode(state, spancoId))

  return (
    <>
      <Link component={RouterLink} to={'/spancos'} underline={'none'} color={'inherit'}>
        Spancos
      </Link>
      {spanco ? <Typography>{spancoId}</Typography> : null}
    </>
  )
}
