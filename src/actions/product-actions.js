import {http} from "./axios-config";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    return (await http.get('/products')).data
});

export const createProduct = createAsyncThunk('products/createProduct', async (product) => {
    return (await http.post('/products', {...product, data:{}})).data[0];
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (product) => {
    return (await http.put(`/products?code=eq.${product.code}`, {...product, data:{}})).data[0];
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productCode) => {
    await http.delete(`/products?code=eq.${productCode}`);
    return productCode
});