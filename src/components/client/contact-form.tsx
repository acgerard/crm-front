import React, { useEffect, useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import { ContactData } from '../../actions/types'
import './contact-form.css'

export function ContactForm({
  title,
  firstName,
  lastName,
  company,
  phone,
  emails,
  update,
}: ContactData & { update: (data: ContactData) => void }) {
  const [updatedTitle, setTitle] = useState<string>(title || '')
  const [updatedFirstName, setFirstName] = useState(firstName || '')
  const [updatedLastName, setLastName] = useState(lastName || '')
  const [updatedCompany, setCompany] = useState(company || '')
  const [updatedPhone, setPhone] = useState(phone || '')
  const [updatedProEmail, setProEmail] = useState(emails?.pro || '')
  const [updatedPersoEmail, setPersoEmail] = useState(emails?.perso || '')

  useEffect(
    function () {
      setTitle(title || '')
      setFirstName(firstName || '')
      setLastName(lastName || '')
      setCompany(company || '')
      setPhone(phone || '')
      setProEmail(emails?.pro || '')
      setPersoEmail(emails?.perso || '')
    },
    [title, firstName, lastName, company, phone, emails?.pro, emails?.perso],
  )

  const handleOnBlur = () => {
    if (
      title !== updatedTitle ||
      firstName !== updatedFirstName ||
      lastName !== updatedLastName ||
      company !== updatedCompany ||
      phone !== updatedPhone ||
      emails?.pro !== updatedProEmail ||
      emails?.perso !== updatedPersoEmail
    ) {
      update({
        title: updatedTitle,
        firstName: updatedFirstName,
        lastName: updatedLastName,
        company: updatedCompany,
        phone: updatedPhone,
        emails: { pro: getEmail(updatedProEmail), perso: getEmail(updatedPersoEmail) },
      })
    }
  }

  const getEmail = (email: string) => (email === '' ? undefined : email)

  return (
    <div className="contact-div">
      <FormControl>
        <InputLabel id="client-title-label">Title</InputLabel>
        <Select
          labelId="client-title-label"
          id="client-title-select"
          value={updatedTitle}
          onChange={e => {
            if (typeof e.target.value === 'string') {
              setTitle(e.target.value)
            } else {
              setTitle('')
            }
          }}
          onBlur={handleOnBlur}
        >
          <MenuItem value={'Mr'}>Mr</MenuItem>
          <MenuItem value={'Mme'}>Mme</MenuItem>
        </Select>
      </FormControl>
      <div />
      <TextField
        id="client-name-first"
        label="First Name"
        value={updatedFirstName}
        onChange={e => setFirstName(e.target.value)}
        onBlur={handleOnBlur}
      />
      <TextField
        id="client-name-last"
        label="Last Name"
        value={updatedLastName}
        onChange={e => setLastName(e.target.value)}
        onBlur={handleOnBlur}
      />
      <TextField id="client-phone" label="Phone" value={updatedPhone} onChange={e => setPhone(e.target.value)} onBlur={handleOnBlur} />
      <TextField
        id="client-email-perso"
        label="Personal Email"
        value={updatedPersoEmail}
        onChange={e => setPersoEmail(e.target.value)}
        onBlur={handleOnBlur}
      />
      <TextField
        id="client-company"
        label="Company"
        value={updatedCompany}
        onChange={e => setCompany(e.target.value)}
        onBlur={handleOnBlur}
      />
      <TextField
        id="client-email-pro"
        label="Professional Email"
        value={updatedProEmail}
        onChange={e => setProEmail(e.target.value)}
        onBlur={handleOnBlur}
      />
    </div>
  )
}
