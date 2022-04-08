import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import React, { useEffect, useState } from 'react'
import { DTCFData, DTCFType } from '../../../actions/types'
import { makeStyles } from '@material-ui/core/styles'
import { FormLabel, Radio, RadioGroup } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    width: '100%',
    columnGap: theme.spacing(2),
    rowGap: theme.spacing(2),
  },
  comment: {
    gridColumn: 'span 2',
  },
}))

export function CrmInfoForm({
  contact,
  newsletter,
  comment,
  dtcfType,
  update,
}: DTCFData & {
  update: ({ contact, newsletter, comment }: DTCFData) => void
}) {
  const classes = useStyles()
  const [updatedContact, setContact] = useState(contact || '')
  const [updatedComment, setComment] = useState(comment || '')
  const [updatedNewsletter, setNewsletter] = useState(newsletter || false)
  const [updatedDtcfType, setDtcfType] = useState(dtcfType)

  useEffect(
    function () {
      setContact(contact || '')
      setComment(comment || '')
      setNewsletter(newsletter || false)
      setDtcfType(dtcfType)
    },
    [contact, newsletter, comment, dtcfType],
  )

  const handleOnBlur = () => {
    if (contact !== updatedContact || newsletter !== updatedNewsletter || comment !== updatedComment || dtcfType !== updatedDtcfType) {
      update({
        contact: updatedContact,
        newsletter: updatedNewsletter,
        comment: updatedComment,
        dtcfType: updatedDtcfType,
      })
    }
  }

  const handleChangeDtcf = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDtcfType(event.target.value === DTCFType.DT ? DTCFType.DT : DTCFType.CF)
  }

  return (
    <div className={classes.container}>
      <TextField
        id="client-contact"
        label="Contact DTCF"
        value={updatedContact}
        onChange={e => setContact(e.target.value)}
        onBlur={handleOnBlur}
      />
      <FormControlLabel
        control={
          <Checkbox name="newsletter" checked={updatedNewsletter} onChange={e => setNewsletter(e.target.checked)} onBlur={handleOnBlur} />
        }
        label="Newsletter"
      />
      <FormControl>
        <FormLabel>DT or CF</FormLabel>
        <RadioGroup row value={updatedDtcfType || null} onChange={handleChangeDtcf} onBlur={handleOnBlur}>
          <FormControlLabel value={DTCFType.DT} control={<Radio />} label="DT" />
          <FormControlLabel value={DTCFType.CF} control={<Radio />} label="CF" />
        </RadioGroup>
      </FormControl>
      <TextField
        className={classes.comment}
        label="Commentaire"
        multiline
        minRows={4}
        maxRows={8}
        value={updatedComment}
        onChange={e => setComment(e.target.value)}
        variant="outlined"
        onBlur={handleOnBlur}
      />
    </div>
  )
}
