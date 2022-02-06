import { productsAdapter } from '../reducer/product-reducer'
import { RootState } from '../store'

const getProductState = (state: RootState) => state.product
export const {
  selectAll: getProducts,
  selectById: getProductById,
  selectEntities: getProductsById,
  selectTotal: getNbProducts,
  selectIds: getProductIds,
} = productsAdapter.getSelectors(getProductState)

export function getProductsStatus(state: RootState) {
  return getProductState(state).status
}

export function getProductsError(state: RootState) {
  return getProductState(state).error
}
