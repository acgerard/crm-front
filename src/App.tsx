import React, { useEffect, useState } from 'react'
import { SignInSide } from './components/SignIn/SignInSide'
import ProductList from './components/product/ProductList'
import SpancoListPage from './components/spanco/SpancoList'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { DefaultLayout } from './components/common/layout/DefaultLayout'
import OfferList from './components/spanco/OfferList'
import ClientList from './components/client/ClientList'
import { useAppDispatch } from './store'
import { getToken, logout } from './redux/authentication'
import { useSelector } from 'react-redux'
import { addErrorInterceptor, addSignInInterceptor, removeInterceptor } from './api/signIn'

function App() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const token = useSelector(getToken)
  // ready when error interceptor is added
  const [ready, setReady] = useState(false)

  useEffect(() => {
    addErrorInterceptor(() => {
      dispatch(logout())
      navigate('/login')
    })
    setReady(true)
  }, [dispatch, navigate])

  useEffect(() => {
    let id = 0
    if (!!token) {
      id = addSignInInterceptor(token)
    }
    return () => removeInterceptor(id)
  }, [token])

  return ready ? (
    <Routes>
      <Route path={'/'} element={<DefaultLayout />}>
        <Route path="clients" element={<ClientList />}>
          <Route path=":clientId" />
        </Route>

        <Route path="spancos/:spancoId" element={<OfferList />}>
          <Route path=":offerId" />
        </Route>
        <Route path="spancos" element={<SpancoListPage />} />

        <Route path="products/*" element={<ProductList />} />
      </Route>
      <Route path="/login" element={<SignInSide />} />
      <Route path="/*" element={<div>Nothing to see here!</div>} />
    </Routes>
  ) : null
}

export default App
