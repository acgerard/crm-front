import { offerAdapter, spancoAdapter } from '../reducer/spanco-reducer'
import { RootState } from '../store'

const getSpancoState = (state: RootState) => state.spanco
const getOfferState = (state: RootState) => state.spanco.offers
export const {
  selectAll: getSpancos,
  selectById: getSpancoById,
  selectEntities: getSpancosById,
  selectIds: getSpancoIds,
  selectTotal: getNbSpancos,
} = spancoAdapter.getSelectors(getSpancoState)
export const {
  selectAll: getOffers,
  selectById: getOfferById,
  selectEntities: getOffersById,
  selectIds: getOfferIds,
  selectTotal: getNbOffers,
} = offerAdapter.getSelectors(getOfferState)

export function getSpancosStatus(state: RootState) {
  return getSpancoState(state).status
}

export function getSpancosError(state: RootState) {
  return getSpancoState(state).error
}
export function getOffersStatus(state: RootState) {
  return getOfferState(state).status
}

export function getOffersError(state: RootState) {
  return getOfferState(state).error
}
