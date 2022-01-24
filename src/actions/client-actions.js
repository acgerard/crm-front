import {http} from "./axios-config";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
    return (await http.get('/clients')).data
});

export const createClient = createAsyncThunk('clients/createClient', async (client) => {
    const response = await http.post('/clients', {...client, active: true});
    return response.data;
});

export const updateClient = createAsyncThunk('clients/updateClient', async (client) => {
    const response = await http.put(`/clients/${client.id}`, client);
    return response.data;
});

export const deleteClient = createAsyncThunk('clients/deleteClient', async (clientId) => {
    await http.delete(`/clients/${clientId}`);
    return clientId
});

