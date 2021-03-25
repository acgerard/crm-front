import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {STATUS} from "./common";
import {createSpanco, deleteSpanco, fetchSpancos, updateSpanco} from "../actions/spanco-actions";

export const spancoAdapter = createEntityAdapter({
    selectId: (spanco) => `${spanco.productCode}-${spanco.promo}`
});

const initialState = spancoAdapter.getInitialState({
    status: STATUS.INIT,
    error: null,
    selectedProduct: null
});

const spancoSlice = createSlice({
        name: 'products',
        initialState,
        reducers: {
            selectProduct(state, action) {
                state.selectedProduct = action.payload;
            }
        },
        extraReducers: {
            [fetchSpancos.pending]: (state) => {
                state.status = STATUS.LOADING;
            },
            [fetchSpancos.fulfilled]: (state, action) => {
                state.status = STATUS.OK;
                spancoAdapter.setAll(state, action.payload)
            },
            [fetchSpancos.rejected]: (state, action) => {
                state.status = STATUS.ERROR;
                state.error = action.error;
            },
            [createSpanco.fulfilled]: spancoAdapter.addOne,
            [createSpanco.rejected]: (state, action) => {
                state.status = STATUS.ERROR;
                state.error = action.error;
            },
            [updateSpanco.fulfilled]: (state, action) => {
                spancoAdapter.upsertOne(state, action)
            },
            [deleteSpanco.fulfilled]: (state, action) => {
                spancoAdapter.removeOne(state, action);
            }
        }
    }
);
export const {selectProduct} = spancoSlice.actions;

export default spancoSlice.reducer;