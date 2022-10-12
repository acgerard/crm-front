import React from 'react'
import { useMatch } from 'react-router'
import { useAppSelector } from '../../store'
import { getProductById } from '../../selectors/product-selectors'
import { ProductForm } from '../product/ProductForm'
import { SpancoForm } from '../spanco/SpancoForm'
import { OfferForm } from '../spanco/OfferForm'
import { getClientById } from '../../redux/client'
import { ClientForm } from '../client/ClientForm'

export function SideBar() {
  return (
    <>
      <ClientSideBar />
      <ProductSideBar />
      <SpancoSideBar />
      <OfferSideBar />
    </>
  )
}

export function ClientSideBar() {
  const matchClient = useMatch('/clients/:clientId')
  const client = useAppSelector(state => getClientById(state, matchClient?.params.clientId || ''))

  return client ? <ClientForm client={client} /> : null
}

export function ProductSideBar() {
  const matchProduct = useMatch('/products/:productId')
  const product = useAppSelector(state => getProductById(state, matchProduct?.params.productId || ''))

  return product ? <ProductForm product={product} /> : null
}

export function SpancoSideBar() {
  const matchSpanco = useMatch('/spancos/:spancoId')
  const spancoId = (matchSpanco?.params.spancoId && parseInt(matchSpanco?.params.spancoId)) || 0

  return spancoId ? <SpancoForm spancoId={spancoId} /> : null
}
export function OfferSideBar() {
  const matchOffer = useMatch('/spancos/:spancoId/:offerId')
  const spancoId = (matchOffer?.params.spancoId && parseInt(matchOffer?.params.spancoId)) || 0
  const offerId = (matchOffer?.params.offerId && parseInt(matchOffer?.params.offerId)) || 0

  return spancoId && offerId ? <OfferForm spancoId={spancoId} offerId={offerId} /> : null
}
