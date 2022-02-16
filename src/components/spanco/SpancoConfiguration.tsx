import React, { useEffect, useState } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../store'
import { getSpancoById } from '../../selectors/spanco-selectors'
import IconButton from '@material-ui/core/IconButton'
import { updateSpanco } from '../../actions/spanco-actions'
import TextField from '@material-ui/core/TextField'
import { Add, DeleteOutlineRounded } from '@material-ui/icons'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  config: {
    width: '100%',
    display: 'grid',
    rowGap: theme.spacing(4),
    gridTemplateRows: 'auto auto 1fr',
  },
  addButton: {
    justifySelf: 'end',
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
}))

export function SpancoConfiguration(props: { spancoId: number }) {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const spanco = useAppSelector(state => getSpancoById(state, props.spancoId))
  const [steps, setSteps] = useState(spanco?.data.configuration?.steps || ([] as string[]))

  useEffect(() => {
    if (spanco?.data.configuration) {
      setSteps(spanco.data.configuration.steps)
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

  return (
    <Box className={classes.config}>
      <Button className={classes.addButton} color="primary" variant={'contained'} onClick={addStep} startIcon={<Add />}>
        Ajouter Etape
      </Button>
      <Box className={classes.items}>
        {steps.map((step, index) => (
          <div key={index} className={classes.item}>
            <TextField value={step} onChange={e => updateStep(index, e.target.value)} onBlur={() => updateSteps(steps)} />
            <IconButton color="secondary" onClick={() => deleteStep(index)}>
              <DeleteOutlineRounded />
            </IconButton>
          </div>
        ))}
      </Box>
    </Box>
  )
}
