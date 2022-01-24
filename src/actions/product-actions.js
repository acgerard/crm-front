import {http} from "./axios-config";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    return (await http.get('/products')).data
});

export const createProduct = createAsyncThunk('products/createProduct', async (product) => {
    return (await http.post('/products', {...product, data:{}})).data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (product) => {
    return (await http.put(`/products/${product.code}`, {...product, data:{}})).data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productCode) => {
    await http.delete(`/products/${productCode}`);
    return productCode
});