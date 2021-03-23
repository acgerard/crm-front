import {http} from "./axios-config";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
    return (await http.get('/clients')).data
});

export const createClient = createAsyncThunk('clients/createClient', async (client) => {
    return (await http.post('/clients', {data: {...client, active: true}})).data[0];
});

export const updateClient = createAsyncThunk('clients/updateClient', async (client) => {
    return (await http.put(`/clients?id=eq.${client.id}`, client)).data[0];
});

export const deleteClient = createAsyncThunk('clients/deleteClient', async (clientId) => {
    await http.delete(`/clients?id=eq.${clientId}`);
    return clientId
});

