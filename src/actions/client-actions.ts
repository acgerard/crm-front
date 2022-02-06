import { http } from './axios-config'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Client, ClientData } from './types'

export const fetchClients = createAsyncThunk('clients/fetchClients', async (): Promise<Client[]> => {
  return (await http.get('/clients')).data
})

export const createClient = createAsyncThunk('clients/createClient', async (client: ClientData): Promise<Client> => {
  const response = await http.post('/clients', client)
  return response.data
})

export const updateClient = createAsyncThunk('clients/updateClient', async (client: Client): Promise<Client> => {
  const response = await http.put(`/clients/${client.id}`, client.data)
  return response.data
})

export const deleteClient = createAsyncThunk('clients/deleteClient', async (clientId: number) => {
  await http.delete(`/clients/${clientId}`)
  return clientId
})
