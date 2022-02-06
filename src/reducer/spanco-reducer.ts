import { createEntityAdapter, createSlice, SerializedError } from '@reduxjs/toolkit'
import { STATUS } from './common'
import { createSpanco, deleteSpanco, fetchOffers, fetchSpancos, updateSpanco } from '../actions/spanco-actions'
import { Offer, Spanco } from '../actions/types'

export const spancoAdapter = createEntityAdapter<Spanco>({
  selectId: spanco => spanco.id,
})
export const offerAdapter = createEntityAdapter<Offer>({
  selectId: offer => offer.id,
})

const initialState = spancoAdapter.getInitialState({
  status: STATUS.INIT,
  offers: offerAdapter.getInitialState({ status: STATUS.INIT, error: null as SerializedError | null }),
  error: null as SerializedError | null,
})

const spancoSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSpancos.pending, state => {
      state.status = STATUS.LOADING
    })
    builder.addCase(fetchSpancos.fulfilled, (state, action) => {
      state.status = STATUS.OK
      spancoAdapter.setAll(state, action.payload)
    })
    builder.addCase(fetchSpancos.rejected, (state, action) => {
      state.status = STATUS.ERROR
      state.error = action.error
    })
    builder.addCase(createSpanco.fulfilled, spancoAdapter.addOne)
    builder.addCase(createSpanco.rejected, (state, action) => {
      state.status = STATUS.ERROR
      state.error = action.error
    })
    builder.addCase(updateSpanco.fulfilled, (state, action) => {
      spancoAdapter.upsertOne(state, action)
    })
    builder.addCase(updateSpanco.rejected, (state, action) => {
      state.status = STATUS.ERROR
      state.error = action.error
    })
    builder.addCase(deleteSpanco.fulfilled, (state, action) => {
      spancoAdapter.removeOne(state, action)
    })
    builder.addCase(deleteSpanco.rejected, (state, action) => {
      state.status = STATUS.ERROR
      state.error = action.error
    })

    builder.addCase(fetchOffers.pending, state => {
      state.offers.status = STATUS.LOADING
    })
    builder.addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers.status = STATUS.OK
      offerAdapter.setAll(state.offers, action.payload)
    })
    builder.addCase(fetchOffers.rejected, (state, action) => {
      state.offers.status = STATUS.ERROR
      state.offers.error = action.error
    })
  },
})

export default spancoSlice.reducer
