import { configureStore } from '@reduxjs/toolkit'
import clientReducer from './redux/client'
import productReducer from './reducer/product-reducer'
import spancoReducer from './reducer/spanco-reducer'
import authReducer from './redux/authentication'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const store = configureStore({
  reducer: {
    authentication: authReducer,
    client: clientReducer,
    product: productReducer,
    spanco: spancoReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
