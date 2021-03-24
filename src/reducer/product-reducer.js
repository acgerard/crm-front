import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {STATUS} from "./common";
import {createProduct, deleteProduct, fetchProducts, updateProduct} from "../actions/product-actions";

export const productsAdapter = createEntityAdapter({
    selectId: (product) => product.code
});

const initialState = productsAdapter.getInitialState({
    status: STATUS.INIT,
    error: null
});

const productsSlice = createSlice({
        name: 'products',
        initialState,
        reducers: {},
        extraReducers: {
            [fetchProducts.pending]: (state) => {
                state.status = STATUS.LOADING;
            },
            [fetchProducts.fulfilled]: (state, action) => {
                state.status = STATUS.OK;
                productsAdapter.setAll(state, action.payload)
            },
            [fetchProducts.rejected]: (state, action) => {
                state.status = STATUS.ERROR;
                state.error = action.error;
            },
            [createProduct.fulfilled]: productsAdapter.addOne,
            [createProduct.rejected]: (state, action) => {
                state.status = STATUS.ERROR;
                state.error = action.error;
            },
            [updateProduct.fulfilled]: (state, action) => {
                productsAdapter.upsertOne(state, action)
            },
            [deleteProduct.fulfilled]: (state, action) => {
                productsAdapter.removeOne(state, action);
            }
        }
    }
);

export default productsSlice.reducer;
