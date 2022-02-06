import { createAsyncThunk } from '@reduxjs/toolkit'
import { http } from './axios-config'
import { Offer, OfferData, Spanco, SpancoData } from './types'

export const fetchSpancos = createAsyncThunk('spanco/fetchAll', async (): Promise<Spanco[]> => {
  return (await http.get('/spancos')).data
})

export const createSpanco = createAsyncThunk(
  'spanco/create',
  async ({ productId, spanco }: { productId: number; spanco: SpancoData }): Promise<Spanco> => {
    return (await http.post('/spancos', { productId: productId, data: spanco })).data
  },
)

export const updateSpanco = createAsyncThunk('spanco/update', async (spanco: Spanco): Promise<Spanco> => {
  return (await http.put(`/spancos/${spanco.id}`, spanco)).data
})

export const deleteSpanco = createAsyncThunk('spanco/delete', async (spancoId: number) => {
  await http.delete(`/spancos/${spancoId}`)
  return spancoId
})

export const fetchOffers = createAsyncThunk('offer/fetchAll', async (spancoId: string): Promise<Offer[]> => {
  return (await http.get(`/spancos/${spancoId}/offers`)).data
})

export const createOffer = createAsyncThunk(
  'offer/create',
  async ({ spancoId, data }: { spancoId: number; data: OfferData }): Promise<Offer> => {
    return (await http.post(`/spancos/${spancoId}/offers`, { spancoId: spancoId, data: data })).data
  },
)

export const updateOffer = createAsyncThunk('offer/update', async (offer: Offer): Promise<Offer> => {
  return (await http.put(`/spancos/${offer.spancoId}/offers/${offer.id}`, offer)).data
})

export const deleteOffer = createAsyncThunk('offer/delete', async ({ spancoId, id }: { spancoId: number; id: number }) => {
  await http.delete(`/spancos/${spancoId}/offers/${id}`)
})
