import {createAsyncThunk} from "@reduxjs/toolkit";
import {http} from "./axios-config";

export const fetchSpancos = createAsyncThunk('spanco/fetchSpancos', async () => {
    return (await http.get('/spancos')).data
});

export const createSpanco = createAsyncThunk('spanco/createSpanco', async (spanco) => {
    return (await http.post('/spancos', {spanco})).data;
});

export const updateSpanco = createAsyncThunk('spanco/updateSpanco', async (spanco) => {
    return (await http.put(`/spancos/${spanco.product_code}/${spanco.promo}`, spanco)).data;
});

export const deleteSpanco = createAsyncThunk('spanco/deleteSpanco', async (productCode, promo) => {
    await http.delete(`/spancos/${productCode}/${promo}`);
    return productCode
});