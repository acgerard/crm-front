import { createEntityAdapter, createSlice, SerializedError } from '@reduxjs/toolkit'
import { STATUS } from './common'
import { createProduct, deleteProduct, fetchProducts, updateProduct } from '../actions/product-actions'
import { Product } from '../actions/types'

export const productsAdapter = createEntityAdapter<Product>({
  selectId: product => product.id,
})

const initialState = productsAdapter.getInitialState({
  status: STATUS.INIT,
  error: null as SerializedError | null,
})

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      state.status = STATUS.LOADING
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = STATUS.OK
      productsAdapter.setAll(state, action.payload)
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = STATUS.ERROR
      state.error = action.error
    })
    builder.addCase(createProduct.fulfilled, productsAdapter.addOne)
    builder.addCase(createProduct.rejected, (state, action) => {
      state.status = STATUS.ERROR
      state.error = action.error
    })
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action)
    })
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      productsAdapter.removeOne(state, action)
    })
  },
})

export default productsSlice.reducer
