import {clientsAdapter} from "../reducer/client-reducer";

export const {
    selectAll: getClients,
    selectById: getClientById
} = clientsAdapter.getSelectors((state) => state.clientReducer);

export function getStatus(state) {
    return state.clientReducer.status;
}

export function getMessage(state) {
    return state.clientReducer.error;
}