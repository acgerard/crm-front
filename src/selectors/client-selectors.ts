import { clientsAdapter } from '../reducer/client-reducer'
import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Client } from '../actions/types'

const getClientState = (state: RootState) => state.client
export const {
  selectAll: getClients,
  selectById: getClientById,
  selectEntities: getClientsById,
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
