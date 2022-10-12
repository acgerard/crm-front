import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../store'
import { addressToString, Client, ClientData, DTCFType } from '../actions/types'
import { STATUS } from '../reducer/common'
import { http } from '../actions/axios-config'
import * as Papa from 'papaparse'
import { downloadFileCsv } from '../helpers/fileHelpers'

export const fetchClients = createAsyncThunk('clients/fetchClients', async (): Promise<Client[]> => {
  return (await http.get('/clients')).data
})

export const createClient = createAsyncThunk('clients/createClient', async (client: ClientData): Promise<Client> => {
  const response = await http.post('/clients', client)
  return response.data
})
export const createClients = createAsyncThunk('clients/createClients', async (clients: ClientData[]): Promise<{ count: number }> => {
  const response = await http.post('/clients/batch', clients)
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

export type CsvClient = {
  title?: string
  firstName?: string
  lastName?: string
  company?: string
  phone?: string
  email?: string
  emailPerso?: string
  contact?: string
  dtcfType?: DTCFType
  addressPro?: string
  addressPerso?: string
  newsletter?: boolean
  comment?: string
  active?: boolean
}

export const exportClients = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const filter = getFilterClient(getState())
  const clients = getClients(getState())
  const filteredClients: CsvClient[] = filterClients(clients, filter).map(client => ({
    title: client.data.title,
    firstName: client.data.firstName,
    lastName: client.data.lastName,
    email: client.data.emails.pro,
    emailPerso: client.data.emails.perso,
    phone: client.data.phone,
    company: client.data.company,
    dtcfType: client.data.dtcfType,
    addressPro: addressToString(client.data.addresses?.pro),
    addressPerso: addressToString(client.data.addresses?.perso),
    contact: client.data.contact,
    newsletter: client.data.newsletter,
    comment: client.data.comment,
    active: client.data.active,
  }))

  const csv = Papa.unparse(filteredClients, {
    header: true,
  })
  downloadFileCsv(csv, 'clients.csv')
}

export const clientsAdapter = createEntityAdapter<Client>({
  selectId: client => client.id,
})

const initialState = clientsAdapter.getInitialState({
  selectedClientId: null as number | null,
  isDrawerOpen: false,
  status: STATUS.INIT,
  filter: null as string | null,
  error: null as SerializedError | null,
})

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    selectClient(state, action: PayloadAction<number | null>) {
      state.selectedClientId = action.payload
      state.isDrawerOpen = true
    },
    closeClientDrawer(state) {
      state.selectedClientId = null
      state.isDrawerOpen = false
    },
    filterClient(state, action: PayloadAction<string | null>) {
      state.filter = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchClients.pending, (state, action) => {
      state.status = STATUS.LOADING
    })
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.status = STATUS.OK
      state.error = null
      clientsAdapter.setAll(state, action.payload)
    })
    builder.addCase(fetchClients.rejected, (state, action) => {
      state.status = STATUS.ERROR
      state.error = action.error
    })
    builder.addCase(createClient.fulfilled, (state, action) => {
      clientsAdapter.addOne(state, action)
      state.error = null
    })
    builder.addCase(createClient.rejected, (state, action) => {
      state.status = STATUS.ERROR
      state.error = action.error
    })
    builder.addCase(createClients.rejected, (state, action) => {
      state.status = STATUS.ERROR
      state.error = action.error
    })
    builder.addCase(updateClient.fulfilled, (state, action) => {
      clientsAdapter.upsertOne(state, action)
    })
    builder.addCase(deleteClient.fulfilled, (state, action) => {
      state.isDrawerOpen = false
      state.selectedClientId = null
      clientsAdapter.removeOne(state, action)
    })
    builder.addCase(deleteClient.rejected, (state, action) => {
      state.status = STATUS.ERROR
      state.error = action.error
    })
  },
})

export const { selectClient, closeClientDrawer, filterClient } = clientsSlice.actions

export default clientsSlice.reducer

export function getClientName(client?: Client) {
  return !!client ? `${client.data.firstName} ${client.data.lastName}` : null
}

const getClientState = (state: RootState) => state.client
export const {
  selectAll: getClients,
  selectById: getClientById,
  selectEntities: getClientsById,
  selectTotal: getClientsCount,
} = clientsAdapter.getSelectors(getClientState)

export function getStatus(state: RootState): string {
  return getClientState(state).status
}

export function getError(state: RootState) {
  return getClientState(state).error
}

export function getSelectedClientId(state: RootState) {
  return getClientState(state).selectedClientId
}

export function isClientDrawerOpen(state: RootState) {
  return getClientState(state).isDrawerOpen
}

export const getSelectedClient = createSelector([getClientsById, getSelectedClientId], (clientsById, selectedId): Client | null => {
  if (selectedId) {
    return clientsById[selectedId] || null
  } else return null
})

export function getFilterClient(state: RootState) {
  return getClientState(state).filter || ''
}

export const filterClients = (clients: Client[], filter?: string) => {
  if (filter && filter !== '') {
    const regex = new RegExp(filter, 'g')
    return clients.filter((client: Client) => {
      return (
        regex.test(client.data.firstName || '') ||
        regex.test(client.data.lastName || '') ||
        regex.test(client.data.comment || '') ||
        regex.test(client.data.company || '') ||
        regex.test(client.data.contact || '') ||
        regex.test(client.data.dtcfType || '')
      )
    })
  } else return clients
}
