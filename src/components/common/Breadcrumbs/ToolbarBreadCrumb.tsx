import React from 'react'
import { useMatch } from 'react-router'
import { Breadcrumbs, Link } from '@material-ui/core'
import { SpancoBreadcrumb } from './SpancoBreadcrumb'
import { ClientBreadcrumb } from './ClientBreadcrumb'
import { ProductBreadcrumb } from './ProductBreadcrumb'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  breadcrumb: {
    color: theme.palette.common.white,
  },
}))

export function ToolbarBreadCrumb() {
  const classes = useStyles()
  const matchSpancos = useMatch('/spancos/*')
  const matchSpanco = useMatch('/spancos/:id')
  const matchClients = useMatch('/clients/*')
  const matchClient = useMatch('/clients/:clientId')
  const matchProducts = useMatch('/products/*')
  const matchProduct = useMatch('/products/:productId')

  return (
    <Breadcrumbs className={classes.breadcrumb}>
      {matchSpancos && (
        <Link component={RouterLink} to={'/spancos'} underline={'none'} color={'inherit'}>
          Spancos
        </Link>
      )}
      {matchSpanco && <SpancoBreadcrumb id={matchSpanco?.params.id} />}
      {matchClients && (
        <Link component={RouterLink} to={'/clients'} underline={'none'} color={'inherit'}>
          Clients
        </Link>
      )}
      {matchClient && <ClientBreadcrumb clientId={matchClient?.params.clientId} />}
      {matchProducts && (
        <Link component={RouterLink} to={'/products'} underline={'none'} color={'inherit'}>
          Products
        </Link>
      )}
      {matchProduct && <ProductBreadcrumb productId={matchProduct?.params.productId} />}
    </Breadcrumbs>
  )
}
