import {createClient, fetchClients} from "../actions/client-actions";
import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";

export const STATUS = {
    INIT: "INIT",
    LOADING: "LOADING",
    OK: "OK",
    ERROR: "ERROR",
};

export const clientsAdapter = createEntityAdapter({
    selectId: (client) => client._id
});

const initialState = clientsAdapter.getInitialState({
    selectedClientId: null,
    status: STATUS.INIT,
    error: null
});

const clientsSlice = createSlice({
        name: 'clients',
        initialState,
        reducers: {
            selectClient(state, action) {
                state.selectedClientId = action.payload;
            },
        },
        extraReducers: {
            [fetchClients.pending]: (state) => {
                state.status = STATUS.LOADING;
            },
            [fetchClients.fulfilled]: (state, action) => {
                state.status = STATUS.OK;
                clientsAdapter.setAll(state, action.payload)
            },
            [fetchClients.rejected]: (state, action) => {
                state.status = STATUS.ERROR;
                state.error = action.error;
            },
            [createClient.fulfilled]: clientsAdapter.addOne,
            [createClient.rejected]: (state, action) => {
                state.status = STATUS.ERROR;
                state.error = action.error;
            }
        }
    }
);

export const { selectClient } = clientsSlice.actions;

export default clientsSlice.reducer;

