import React from 'react'
import ClientListPage from './components/client/client-list-page'
import { SignInSide } from './components/SignIn/SignInSide'
import ProductList from './components/product/ProductList'
import SpancoListPage from './components/spanco/SpancoList'
import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './components/common/layout/DefaultLayout'

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<DefaultLayout />}>
        <Route path="clients/*" element={<ClientListPage />} />
        <Route path="spancos/*" element={<SpancoListPage />} />
        <Route path="products/*" element={<ProductList />} />
      </Route>
      <Route path="/login" element={<SignInSide />} />
      <Route path="/*" element={<div>Nothing to see here!</div>} />
    </Routes>
  )
}

export default App
