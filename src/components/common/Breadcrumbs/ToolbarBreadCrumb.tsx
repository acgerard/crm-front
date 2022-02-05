import React from 'react'
import { useMatch } from 'react-router'
import { Breadcrumbs } from '@material-ui/core'
import { SpancoBreadcrumb } from './SpancoBreadcrumb'
import { ClientBreadcrumb } from './ClientBreadcrumb'
import { ProductBreadcrumb } from './ProductBreadcrumb'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  breadcrumb: {
    color: theme.palette.common.white,
  },
}))

export function ToolbarBreadCrumb() {
  const classes = useStyles()
  const matchSpanco = useMatch('/spancos')
  const matchClient = useMatch('/clients')
  const matchProduct = useMatch('/products')

  return (
    <Breadcrumbs className={classes.breadcrumb}>
      {matchSpanco && <SpancoBreadcrumb />}
      {matchClient && <ClientBreadcrumb />}
      {matchProduct && <ProductBreadcrumb />}
    </Breadcrumbs>
  )
}
