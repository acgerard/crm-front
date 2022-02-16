import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import { useAppSelector } from '../../store'
import { getSpancoById } from '../../selectors/spanco-selectors'

export function ProgressDropDown(props: {
  spancoId: number
  value: number
  setProgress: (newProgress: number) => void
  onBlur: () => void
}) {
  const spanco = useAppSelector(state => getSpancoById(state, props.spancoId))

  return spanco ? (
    <FormControl>
      <InputLabel>{'Progression'}</InputLabel>
      <Select
        value={props.value}
        onChange={e => {
          if (typeof e.target.value === 'string') {
            const value = parseInt(e.target.value)
            if (isNaN(value)) {
              props.setProgress(0)
            } else {
              props.setProgress(value)
            }
          } else {
            props.setProgress(0)
          }
        }}
        onBlur={props.onBlur}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
      >
        {spanco.data.configuration?.steps.map((step, index) => (
          <MenuItem key={index} value={index.toString()}>
            {step}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : null
}
