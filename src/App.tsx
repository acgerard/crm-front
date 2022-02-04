import React from 'react'
import { Link, Redirect, Route, Switch } from 'react-router-dom'
import ClientListPage from './pages/client-list-page'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Container from '@material-ui/core/Container'
import { SignInSide } from './components/SignInSide'
import ProductListPage from './pages/product-list-page'
import SpancoListPage from './pages/spanco-list-page'
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()
  return (
    <Switch>
      <Route path={'/login'}>
        <SignInSide />
      </Route>
      <Route path="/clients">
        <Container>
          <Tabs value={location.pathname}>
            <Tab label="Clients" href="#basic-tabs" value="/clients" component={Link} to="/clients" />
            <Tab label="Spanco" value="/spancos" component={Link} to="/spancos" />
            <Tab label="Products" value="/products" component={Link} to="/products" />
          </Tabs>
          <ClientListPage />
        </Container>
      </Route>
      <Route path="/spancos">
        <Container>
          <Tabs value={location.pathname}>
            <Tab label="Clients" href="#basic-tabs" value="/clients" component={Link} to="/clients" />
            <Tab label="Spanco" value="/spancos" component={Link} to="/spancos" />
            <Tab label="Products" value="/products" component={Link} to="/products" />
          </Tabs>
          <SpancoListPage />
        </Container>
      </Route>
      <Route path="/products">
        <Container>
          <Tabs value={location.pathname}>
            <Tab label="Clients" href="#basic-tabs" value="/clients" component={Link} to="/clients" />
            <Tab label="Spanco" value="/spancos" component={Link} to="/spancos" />
            <Tab label="Products" value="/products" component={Link} to="/products" />
          </Tabs>
          <ProductListPage />
        </Container>
      </Route>
      <Route path="/*">
        <Redirect to="/login" />
      </Route>
    </Switch>
  )
}

export default App
