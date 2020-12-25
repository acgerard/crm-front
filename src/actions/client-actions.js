import {http} from "./axios-config";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
    const response = await http.get('/clients');
    return response.data.data || response.data ; // in case pagination is disabled
});

export const createClient = createAsyncThunk('clients/createClient', async (client) => {
    const response = await http.post('/clients', client);
    return response.data
});
