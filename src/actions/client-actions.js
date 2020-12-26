import {http} from "./axios-config";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
    const response = await http.get('/clients');
    return (response.data.data || response.data) // in case pagination is disabled
        .map(client => transformClient(client))
});

export const createClient = createAsyncThunk('clients/createClient', async (client) => {
    const response = await http.post('/clients', client);
    return transformClient(response.data);
});

export const updateClient = createAsyncThunk('clients/updateClient', async ({id, client}) => {
    const response = await http.put(`/clients/${id}`, client);
    return transformClient(response.data);
});

export const deleteClient = createAsyncThunk('clients/deleteClient', async (clientId) => {
    await http.delete(`/clients/${clientId}`);
    return clientId
});

function transformClient(client) {
    return {...client, firstName: client.name.first, lastName: client.name.last}
}
