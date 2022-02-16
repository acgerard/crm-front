import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import React, { useEffect, useState } from 'react'
import { DTCFData } from '../../../actions/types'
import { makeStyles } from '@material-ui/core/styles'

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

// TODO add DTCF type
export function CrmInfoForm({
  contact,
  newsletter,
  comment,
  update,
}: DTCFData & {
  update: ({ contact, newsletter, comment }: DTCFData) => void
}) {
  const classes = useStyles()
  const [updatedContact, setContact] = useState(contact || '')
  const [updatedComment, setComment] = useState(comment || '')
  const [updatedNewsletter, setNewsletter] = useState(newsletter || false)

  useEffect(
    function () {
      setContact(contact || '')
      setComment(comment || '')
      setNewsletter(newsletter || false)
    },
    [contact, newsletter, comment],
  )

  const handleOnBlur = () => {
    if (contact !== updatedContact || newsletter !== updatedNewsletter || comment !== updatedComment) {
      update({
        contact: updatedContact,
        newsletter: updatedNewsletter,
        comment: updatedComment,
      })
    }
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
