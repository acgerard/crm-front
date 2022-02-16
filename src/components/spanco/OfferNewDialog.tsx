import React, { useState } from 'react'
import { ConfirmDialog } from '../common/dialog/ConfirmDialog'
import { makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { createOffer } from '../../actions/spanco-actions'
import { ClientPicker } from './ClientPicker'

const useStyles = makeStyles(theme => ({
  container: {
    minWidth: '300px',
    display: 'grid',
    rowGap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

export function OfferNewDialog(props: { spancoId: number; open?: boolean; onClose?: () => void }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [clientId, setClientId] = useState<number | null>(null)

  const create = () => {
    if (!!clientId) {
      dispatch(createOffer({ spancoId: props.spancoId, data: { clientId: clientId, progress: 0 } }))
    }
  }

  return (
    <ConfirmDialog
      title={'Créer une offre'}
      confirmLabel={'Créer'}
      open={props.open}
      onClose={props.onClose}
      onConfirm={create}
      disabled={clientId === null}
    >
      <div className={classes.container}>
        <ClientPicker clientId={clientId} setClientId={setClientId} />
      </div>
    </ConfirmDialog>
  )
}
