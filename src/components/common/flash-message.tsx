import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab'
import { SerializedError } from '@reduxjs/toolkit'

export function FlashMessage({ error }: { error: SerializedError }) {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {error.message}
    </Alert>
  )
}
