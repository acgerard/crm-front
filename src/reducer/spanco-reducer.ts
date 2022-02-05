import { createEntityAdapter, createSlice, SerializedError } from '@reduxjs/toolkit'
import { STATUS } from './common'
import { createSpanco, deleteSpanco, fetchSpancos, updateSpanco } from '../actions/spanco-actions'
import { Spanco } from '../actions/types'

export function getSpancoId(productCode: string, promo: string) {
  return `${productCode}-${promo}`
}

export const spancoAdapter = createEntityAdapter<Spanco>({
  selectId: spanco => getSpancoId(spanco.productCode, spanco.promo),
})

const initialState = spancoAdapter.getInitialState({
  status: STATUS.INIT,
  error: null as SerializedError | null,
  selectedProduct: null as string | null,
})

const spancoSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    selectProduct(state, action) {
      state.selectedProduct = action.payload
    },
  },
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
    builder.addCase(deleteSpanco.fulfilled, (state, action) => {
      spancoAdapter.removeOne(state, action)
    })
  },
})
export const { selectProduct } = spancoSlice.actions

export default spancoSlice.reducer
