import {createAsyncThunk} from "@reduxjs/toolkit";
import {http} from "./axios-config";

export const fetchSpancos = createAsyncThunk('spanco/fetchSpancos', async () => {
    return (await http.get('/spancos')).data
});

export const createSpanco = createAsyncThunk('spanco/createSpanco', async (spanco) => {
    return (await http.post('/spancos', {spanco})).data[0];
});

export const updateSpanco = createAsyncThunk('spanco/updateSpanco', async (spanco) => {
    return (await http.put(`/spancos?product_code=eq.${spanco.product_code}&promo=eq.${spanco.promo}`, spanco)).data[0];
});

export const deleteSpanco = createAsyncThunk('spanco/deleteSpanco', async (productCode, promo) => {
    await http.delete(`/spancos?product_code=eq.${productCode}&promo=eq.${promo}`);
    return productCode
});