import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { getOfferById } from '../../selectors/spanco-selectors'
import { deleteOffer, updateOffer } from '../../actions/spanco-actions'
import DeleteIcon from '@material-ui/icons/Delete'
import TextField from '@material-ui/core/TextField'
import { Box, FormControlLabel, makeStyles, Switch } from '@material-ui/core'
import { ClientPicker } from './ClientPicker'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { ConfirmDialog } from '../common/dialog/ConfirmDialog'
import { CloseOutlined } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { ProgressDropDown } from './ProgressDropDown'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    display: 'grid',
    gridTemplateRows: 'repeat(8, auto) 1fr',
    rowGap: theme.spacing(2),
  },
  button: {
    justifySelf: 'end',
  },
  header: {
    display: 'grid',
    rowGap: theme.spacing(1),
  },
  title: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '1fr auto',
  },
  twoCol: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridAutoFlow: 'column',
    columnGap: theme.spacing(2),
  },
}))

export function OfferForm(props: { spancoId: number; offerId: number }) {
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const offer = useAppSelector(state => getOfferById(state, props.offerId))
  const [clientId, setClientId] = useState<number | null>(offer?.data.clientId || null)
  const [prescriptorId, setPrescriptorId] = useState<number | null>(offer?.data.prescriptorId || null)
  const [price, setPrice] = useState(offer?.data.price || '')
  const [comment, setComment] = useState(offer?.data.comment)
  const [action, setAction] = useState(offer?.data.action)
  const [followedBy, setFollowedBy] = useState(offer?.data.followedBy)
  const [probability, setProbability] = useState(offer?.data.probability || '')
  const [progress, setProgress] = useState(offer?.data.progress || 0)
  const [pro, setPro] = useState(offer?.data.pro || false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setAction(offer?.data.action)
    setComment(offer?.data.comment)
    setClientId(offer?.data.clientId || null)
    setPrescriptorId(offer?.data.prescriptorId || null)
    setPrice(offer?.data.price || '')
    setProgress(offer?.data.progress || 0)
    setProbability(offer?.data.probability || '')
    setFollowedBy(offer?.data.followedBy || '')
    setPro(offer?.data.pro || false)
  }, [offer])

  const handleUpdateOffer = () => {
    if (!!offer) {
      const newOffer = {
        ...offer,
        data: { ...offer.data, comment, action, followedBy, clientId, prescriptorId, progress: progress || 0, pro: pro },
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

  const handleDelete = () => {
    dispatch(deleteOffer({ spancoId: props.spancoId, id: props.offerId }))
    backToSpanco()
  }

  const backToSpanco = () => {
    navigate(`/spancos/${props.spancoId}`)
  }

  return !!offer ? (
    <Box className={classes.form}>
      <div className={classes.header}>
        <div className={classes.title}>
          <Typography variant={'h4'}>Offre</Typography>
          <IconButton onClick={backToSpanco}>
            <CloseOutlined />
          </IconButton>
        </div>
        <Button
          className={classes.button}
          color="secondary"
          variant={'contained'}
          startIcon={<DeleteIcon />}
          onClick={() => setShowModal(true)}
        >
          Supprimer
        </Button>
      </div>
      <ClientPicker clientId={clientId} canUnset={true} setClientId={setClientId} onBlur={handleUpdateOffer} />
      <ClientPicker
        label="Prescripteur"
        clientId={prescriptorId}
        canUnset={true}
        setClientId={setPrescriptorId}
        onBlur={handleUpdateOffer}
      />
      <ProgressDropDown spancoId={props.spancoId} value={progress} setProgress={setProgress} onBlur={handleUpdateOffer} />
      <div className={classes.twoCol}>
        <TextField label="Suivi par" value={followedBy} onChange={e => setFollowedBy(e.target.value)} onBlur={handleUpdateOffer} />
        <FormControlLabel
          control={<Switch color="primary" checked={!!pro} onChange={e => setPro(e.target.checked)} onBlur={handleUpdateOffer} />}
          label={pro ? 'Pro' : 'Perso'}
        />
      </div>
      <div className={classes.twoCol}>
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
      </div>

      <TextField
        minRows={5}
        maxRows={8}
        label="Action"
        multiline
        value={action}
        onChange={e => setAction(e.target.value)}
        onBlur={handleUpdateOffer}
        variant="outlined"
      />
      <TextField
        label="Commentaire"
        multiline
        minRows={4}
        maxRows={8}
        value={comment}
        onChange={e => setComment(e.target.value)}
        variant="outlined"
        onBlur={handleUpdateOffer}
      />
      <ConfirmDialog
        open={showModal}
        title={'Supprimer offre'}
        confirmLabel={'Supprimer'}
        onConfirm={handleDelete}
        onClose={() => setShowModal(false)}
      >
        <Typography>{`Confirmez vous la suppression de l'offre ?`}</Typography>
      </ConfirmDialog>
    </Box>
  ) : null
}
