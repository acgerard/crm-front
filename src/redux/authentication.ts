import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { signIn } from '../api/signIn'

export const signInAction = createAsyncThunk('authentication/signIn', async ({ email, password }: { email: string; password: string }) => {
  const response = await signIn(email, password)
  const token = window.btoa(`${email}:${password}`)
  return { email, username: response.data.name, token }
})

const initialState = {
  token: null as string | null,
  username: null as string | null,
  email: null as string | null,
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logout(state) {
      state.token = null
      state.username = null
      state.email = null
    },
  },
  extraReducers: builder => {
    builder.addCase(signInAction.fulfilled, (state, action) => {
      state.username = action.payload.username
      state.email = action.payload.email
      state.token = action.payload.token
    })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer

export const getUsername = (state: RootState) => state.authentication.username
export const getToken = (state: RootState) => state.authentication.token
export const getEmail = (state: RootState) => state.authentication.email
