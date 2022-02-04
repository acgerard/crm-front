import { spancoAdapter } from '../reducer/spanco-reducer'
import { RootState } from '../store'

const getSpancoState = (state: RootState) => state.spanco
export const {
  selectAll: getSpancos,
  selectById: getSpancoByPromoAndCode,
  selectEntities: getSpancosByPromoAndCode,
} = spancoAdapter.getSelectors(getSpancoState)

export function getSpancosStatus(state: RootState) {
  return getSpancoState(state).status
}

export function getSpancosError(state: RootState) {
  return getSpancoState(state).error
}

export function getProductSelected(state: RootState) {
  return getSpancoState(state).selectedProduct
}
