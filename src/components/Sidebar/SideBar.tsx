import React from 'react'
import { useMatch } from 'react-router'
import { useAppSelector } from '../../store'
import { getProductById } from '../../selectors/product-selectors'
import { ProductForm } from '../product/ProductForm'
import { SpancoConfiguration } from '../spanco/SpancoConfiguration'
import { OfferForm } from '../spanco/OfferForm'

export function SideBar() {
  return (
    <>
      <ProductSideBar />
      <SpancoSideBar />
      <OfferSideBar />
    </>
  )
}

export function ProductSideBar() {
  const matchProduct = useMatch('/products/:productId')
  const product = useAppSelector(state => getProductById(state, matchProduct?.params.productId || ''))

  return product ? <ProductForm product={product} /> : null
}

export function SpancoSideBar() {
  const matchSpanco = useMatch('/spancos/:spancoId')
  const spancoId = (matchSpanco?.params.spancoId && parseInt(matchSpanco?.params.spancoId)) || 0

  return spancoId ? <SpancoConfiguration spancoId={spancoId} /> : null
}
export function OfferSideBar() {
  const matchOffer = useMatch('/spancos/:spancoId/:offerId')
  const spancoId = (matchOffer?.params.spancoId && parseInt(matchOffer?.params.spancoId)) || 0
  const offerId = (matchOffer?.params.offerId && parseInt(matchOffer?.params.offerId)) || 0

  return spancoId && offerId ? <OfferForm spancoId={spancoId} offerId={offerId} /> : null
}
