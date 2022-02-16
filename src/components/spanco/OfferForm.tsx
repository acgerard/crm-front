import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { getOfferById } from '../../selectors/spanco-selectors'
import { deleteOffer, updateOffer } from '../../actions/spanco-actions'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'
import { ClientPicker } from './ClientPicker'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    display: 'grid',
    gridTemplateRows: 'repeat(9, auto) 1fr',
    rowGap: theme.spacing(2),
  },
  button: {
    justifySelf: 'end',
  },
}))

export function OfferForm(props: { spancoId: number; offerId: number }) {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const offer = useAppSelector(state => getOfferById(state, props.offerId))
  const [clientId, setClientId] = useState<number | null>(offer?.data.clientId || null)
  const [prescriptorId, setPrescriptorId] = useState<number | null>(offer?.data.prescriptorId || null)
  const [price, setPrice] = useState(offer?.data.price || '')
  const [comment, setComment] = useState(offer?.data.comment)
  const [action, setAction] = useState(offer?.data.action)
  const [followedBy, setFollowedBy] = useState(offer?.data.followedBy)
  const [probability, setProbability] = useState(offer?.data.probability || '')
  const [progress, setProgress] = useState(offer?.data.progress)

  useEffect(() => {
    setAction(offer?.data.action)
    setComment(offer?.data.comment)
    setClientId(offer?.data.clientId || null)
    setPrescriptorId(offer?.data.prescriptorId || null)
    setPrice(offer?.data.price || '')
    setProgress(offer?.data.progress)
    setProbability(offer?.data.probability || '')
    setFollowedBy(offer?.data.followedBy)
  }, [offer])

  const handleUpdateOffer = () => {
    if (!!offer) {
      const newOffer = {
        ...offer,
        data: { ...offer.data, comment, action, followedBy, clientId, prescriptorId, progress: progress || 0 },
      }
      if (probability && probability !== '') {
        newOffer.data.probability = probability as number
      } else {
        delete newOffer.data.probability
      }
      if (price && price !== '') {
        newOffer.data.price = price as number
      } else {
        delete newOffer.data.price
      }
      dispatch(updateOffer(newOffer))
    }
  }

  const handleNumber = (value: string, setValue: (n: number | string) => void) => {
    const n = parseInt(value)
    if (isNaN(n)) {
      setValue('')
    } else {
      setValue(n)
    }
  }

  return !!offer ? (
    <div className={classes.form}>
      <Button
        className={classes.button}
        color="secondary"
        variant={'contained'}
        startIcon={<DeleteIcon />}
        onClick={() => dispatch(deleteOffer({ spancoId: offer.spancoId, id: offer.id }))}
      >
        Supprimer
      </Button>
      <ClientPicker clientId={clientId} canUnset={true} setClientId={setClientId} onBlur={handleUpdateOffer} />
      <ClientPicker
        label="Prescripteur"
        clientId={prescriptorId}
        canUnset={true}
        setClientId={setPrescriptorId}
        onBlur={handleUpdateOffer}
      />
      <TextField label="Suivi par" value={followedBy} onChange={e => setFollowedBy(e.target.value)} onBlur={handleUpdateOffer} />
      <TextField
        label="Prix"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        value={price}
        onChange={e => handleNumber(e.target.value, setPrice)}
        onBlur={handleUpdateOffer}
      />
      <TextField
        label="Probabilité (%)"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        value={probability}
        onChange={e => handleNumber(e.target.value, setProbability)}
        onBlur={handleUpdateOffer}
      />
      <TextField
        label="Progression"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        value={progress}
        onChange={e => setProgress(parseInt(e.target.value))}
        onBlur={handleUpdateOffer}
      />

      <TextareaAutosize
        aria-label="minimum height"
        minRows={5}
        placeholder="Action"
        value={action}
        onChange={e => setAction(e.target.value)}
        onBlur={handleUpdateOffer}
      />
      <TextareaAutosize
        aria-label="minimum height"
        minRows={5}
        placeholder="Commentaire"
        value={comment}
        onChange={e => setComment(e.target.value)}
        onBlur={handleUpdateOffer}
      />
    </div>
  ) : null
}
