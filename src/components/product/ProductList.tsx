import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../actions/product-actions'
import { getProductsError, getProductsStatus } from '../../selectors/product-selectors'
import { ProductNewDialog } from './ProductNewDialog'
import { ProductTable } from './ProductTable'
import { DefaultList } from '../common/layout/DefaultList'

function ProductList() {
  const dispatch = useDispatch()
  const status = useSelector(getProductsStatus)
  const error = useSelector(getProductsError)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <DefaultList status={status} error={error} dialog={<ProductNewDialog />}>
      <ProductTable />
    </DefaultList>
  )
}

export default ProductList
