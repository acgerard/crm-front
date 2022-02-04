import { createClient, deleteClient, fetchClients, updateClient } from '../actions/client-actions'
import { createEntityAdapter, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { STATUS } from './common'
import { Client } from '../actions/types'

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
      clientsAdapter.setAll(state, action.payload)
    })
    builder.addCase(fetchClients.rejected, (state, action) => {
      state.status = STATUS.ERROR
      state.error = action.error
    })
    builder.addCase(createClient.fulfilled, (state, action) => {
      clientsAdapter.addOne(state, action)
    })
    builder.addCase(createClient.rejected, (state, action) => {
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
  },
})

export const { selectClient, closeClientDrawer, filterClient } = clientsSlice.actions

export default clientsSlice.reducer
