import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useMatch } from 'react-router'
import { useAppSelector } from '../../store'
import { getProductByCode } from '../../selectors/product-selectors'
import { ProductForm } from '../product/product-form'

const useStyles = makeStyles(theme => ({}))

export function SideBar() {
  return (
    <>
      <ProductSideBar />
    </>
  )
}

export function ProductSideBar() {
  const matchProduct = useMatch('/products/:productCode')
  const product = useAppSelector(state => getProductByCode(state, matchProduct?.params.productCode || ''))
  console.log(matchProduct, product)

  return product ? <ProductForm product={product} /> : null
}
