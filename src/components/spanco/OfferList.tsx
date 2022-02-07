import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../actions/product-actions'
import { DefaultList } from '../common/layout/DefaultList'
import { fetchOffers, fetchSpancos } from '../../actions/spanco-actions'
import { getOffersError, getOffersStatus } from '../../selectors/spanco-selectors'
import { useParams } from 'react-router-dom'
import { OfferNewDialog } from './OfferNewDialog'
import { fetchClients } from '../../actions/client-actions'
import { OfferTable } from './OfferTable'

function OfferList() {
  const dispatch = useDispatch()
  const params = useParams<{ spancoId: string }>()
  const status = useSelector(getOffersStatus)
  const error = useSelector(getOffersError)
  const spancoId = params.spancoId ? parseInt(params.spancoId) : null

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchSpancos())
    dispatch(fetchClients())
  }, [dispatch])

  useEffect(() => {
    if (!!params.spancoId) {
      dispatch(fetchOffers(params.spancoId))
    }
  }, [params.spancoId, dispatch])

  return spancoId ? (
    <DefaultList error={error} status={status} dialog={<OfferNewDialog spancoId={spancoId} />}>
      <OfferTable />
    </DefaultList>
  ) : null
}

export default OfferList
