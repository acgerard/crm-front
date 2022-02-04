import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import React, { useEffect, useState } from 'react'
import './crmInfo-form.css'
import { DTCFData } from '../../actions/types'

// TODO add DTCF type
export function CrmInfoForm({
  contact,
  newsletter,
  comment,
  update,
}: DTCFData & {
  update: ({ contact, newsletter, comment }: DTCFData) => void
}) {
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
    <div className="crmInfo-div">
      <TextField
        id="client-contact"
        label="DTCF Contact"
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
      <TextareaAutosize
        aria-label="minimum height"
        rowsMin={5}
        placeholder="Comment"
        className="crmInfo-comment"
        value={updatedComment}
        onChange={e => setComment(e.target.value)}
        onBlur={handleOnBlur}
      />
    </div>
  )
}
