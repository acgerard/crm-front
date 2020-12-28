import {clientsAdapter} from "../reducer/client-reducer";
import {createSelector} from "@reduxjs/toolkit";

export const {
    selectAll: getClients,
    selectById: getClientById,
    selectEntities: getClientsById
} = clientsAdapter.getSelectors((state) => state.clientReducer);

export function getStatus(state) {
    return state.clientReducer.status;
}

export function getError(state) {
    return state.clientReducer.error;
}

export function getSelectedClientId(state) {
    return state.clientReducer.selectedClientId;
}

export function isClientDrawerOpen(state) {
    return state.clientReducer.isDrawerOpen;
}

export const getSelectedClient = createSelector(
    [getClientsById, getSelectedClientId],
    (clientsById, selectedId)=> {
        if(selectedId) {
            return clientsById[selectedId]
        } else return null
    }
);

export function getFilterClient(state) {
    return state.clientReducer.filter || '';
}