import React from 'react'
import { useMatch } from 'react-router'
import { useAppSelector } from '../../store'
import { getProductById } from '../../selectors/product-selectors'
import { ProductForm } from '../product/ProductForm'

export function SideBar() {
  return (
    <>
      <ProductSideBar />
    </>
  )
}

export function ProductSideBar() {
  const matchProduct = useMatch('/products/:productCode')
  const product = useAppSelector(state => getProductById(state, matchProduct?.params.productCode || ''))

  return product ? <ProductForm product={product} /> : null
}
