import { http } from './axios-config'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Product } from './types'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (): Promise<Product[]> => {
  return (await http.get('/products')).data
})

export const createProduct = createAsyncThunk('products/createProduct', async (product: Product): Promise<Product> => {
  return (await http.post('/products', { ...product, data: {} })).data
})

export const updateProduct = createAsyncThunk('products/updateProduct', async (product: Product): Promise<Product> => {
  return (await http.put(`/products/${product.code}`, { ...product, data: {} })).data
})

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productCode: string) => {
  await http.delete(`/products/${productCode}`)
  return productCode
})
