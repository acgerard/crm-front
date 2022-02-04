import { createAsyncThunk } from '@reduxjs/toolkit'
import { http } from './axios-config'
import { Spanco } from './types'

export const fetchSpancos = createAsyncThunk('spanco/fetchSpancos', async (): Promise<Spanco[]> => {
  return (await http.get('/spancos')).data
})

export const createSpanco = createAsyncThunk('spanco/createSpanco', async (spanco: Spanco): Promise<Spanco> => {
  return (await http.post('/spancos', { spanco })).data
})

export const updateSpanco = createAsyncThunk('spanco/updateSpanco', async (spanco: Spanco): Promise<Spanco> => {
  return (await http.put(`/spancos/${spanco.productCode}/${spanco.promo}`, spanco)).data
})

export const deleteSpanco = createAsyncThunk(
  'spanco/deleteSpanco',
  async ({ productCode, promo }: { productCode: string; promo: string }) => {
    await http.delete(`/spancos/${productCode}/${promo}`)
    return productCode
  },
)
