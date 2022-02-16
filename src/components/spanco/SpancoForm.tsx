import React, { useEffect, useState } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../store'
import { getSpancoById } from '../../selectors/spanco-selectors'
import IconButton from '@material-ui/core/IconButton'
import { deleteSpanco, updateSpanco } from '../../actions/spanco-actions'
import TextField from '@material-ui/core/TextField'
import { Add, DeleteOutline } from '@material-ui/icons'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { getProductById } from '../../selectors/product-selectors'
import DeleteIcon from '@material-ui/icons/Delete'
import { ConfirmDialog } from '../common/dialog/ConfirmDialog'
import { useNavigate } from 'react-router-dom'
import { DefaultSidebar } from '../common/layout/DefaultSidebar'

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    display: 'grid',
    rowGap: theme.spacing(4),
    gridTemplateRows: 'auto auto 1fr',
  },
  items: {
    display: 'grid',
    alignItems: 'start',
    rowGap: theme.spacing(2),
  },
  item: {
    display: 'grid',
    gridAutoFlow: 'columns',
    gridTemplateColumns: '1fr auto',
  },
  addButton: {
    justifySelf: 'start',
  },
}))

export function SpancoForm(props: { spancoId: number }) {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const spanco = useAppSelector(state => getSpancoById(state, props.spancoId))
  const product = useAppSelector(state => getProductById(state, spanco?.productId || ''))
  const [steps, setSteps] = useState(spanco?.data.configuration?.steps || ([] as string[]))
  const [showModal, setShowModal] = useState(false)
  const [promo, setPromo] = useState(spanco?.data.promo || '')

  useEffect(() => {
    if (spanco) {
      if (spanco.data.configuration) {
        setSteps(spanco.data.configuration.steps)
      }
      setPromo(spanco.data.promo)
    }
  }, [spanco])

  const updateSteps = (updatedSteps: string[]) => {
    if (spanco) {
      dispatch(updateSpanco({ ...spanco, data: { ...spanco.data, configuration: { steps: updatedSteps } } }))
    }
  }
  const addStep = () => {
    const newSteps = [...steps]
    newSteps.splice(steps.length, 0, 'New step')
    setSteps(newSteps)
    updateSteps(newSteps)
  }

  const deleteStep = (index: number) => {
    const newSteps = [...steps]
    newSteps.splice(index, 1)
    setSteps(newSteps)
    updateSteps(newSteps)
  }

  const updateStep = (index: number, step: string) => {
    setSteps(prev => {
      const newSteps = [...prev]
      newSteps.splice(index, 1, step)
      return newSteps
    })
  }

  const update = () => {
    if (spanco) {
      dispatch(updateSpanco({ ...spanco, data: { ...spanco.data, promo: promo } }))
    }
  }

  const del = () => {
    if (spanco) {
      dispatch(deleteSpanco(spanco.id))
      navigate('/spancos')
    }
  }
  const backToSpancos = () => {
    navigate(`/spancos`)
  }

  return (
    <DefaultSidebar
      name={`${product?.data.code} - ${spanco?.data.promo}`}
      backAction={backToSpancos}
      toolbarActions={
        <Button color="secondary" variant={'contained'} startIcon={<DeleteIcon />} onClick={() => setShowModal(true)}>
          Supprimer
        </Button>
      }
    >
      <Box className={classes.container}>
        <TextField label="Promo" value={promo} required={true} onChange={e => setPromo(e.target.value)} onBlur={update} />

        <Box className={classes.items}>
          <Typography variant={'h5'}>Etapes du pipe</Typography>
          {steps.map((step, index) => (
            <div key={index} className={classes.item}>
              <TextField value={step} onChange={e => updateStep(index, e.target.value)} onBlur={() => updateSteps(steps)} />
              <IconButton color="secondary" onClick={() => deleteStep(index)}>
                <DeleteOutline />
              </IconButton>
            </div>
          ))}
          <Button className={classes.addButton} color="primary" variant={'outlined'} onClick={addStep} startIcon={<Add />}>
            Etape
          </Button>
        </Box>
        <ConfirmDialog
          open={showModal}
          title={'Supprimer spanco'}
          confirmLabel={'Supprimer'}
          onConfirm={del}
          onClose={() => setShowModal(false)}
        >
          <Typography>Cette action est définitive et supprimera le spanco et toutes les offres associées.</Typography>
        </ConfirmDialog>
      </Box>
    </DefaultSidebar>
  )
}
