import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { fetchProducts } from '../../actions/product-actions'
import { getSpancosError, getSpancosStatus } from '../../selectors/spanco-selectors'
import { SpancoNewDialog } from './SpancoNewDialog'
import { fetchSpancos } from '../../actions/spanco-actions'
import { SpancoTable } from './SpancoTable'
import { DefaultList } from '../common/layout/DefaultList'

function SpancoList() {
  const dispatch = useDispatch()
  const status = useSelector(getSpancosStatus)
  const error = useSelector(getSpancosError)

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchSpancos())
  }, [dispatch])

  return (
    <DefaultList status={status} error={error} dialog={<SpancoNewDialog />}>
      <SpancoTable />
    </DefaultList>
  )
}

export default SpancoList
