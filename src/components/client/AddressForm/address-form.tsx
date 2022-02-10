import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import './address-form.css'
import Typography from '@material-ui/core/Typography'
import { Address } from '../../../actions/types'

export function AddressForm({
  label,
  description,
  zipCode,
  town,
  country,
  update,
}: Address & { label: string; update: (address: Address) => void }) {
  const [updatedDescription, setDesc] = useState(description || '')
  const [updatedZipCode, setZipCode] = useState(zipCode || '')
  const [updatedTown, setTown] = useState(town || '')
  const [updatedCountry, setCountry] = useState(country || '')

  useEffect(
    function () {
      setDesc(description || '')
      setZipCode(zipCode || '')
      setTown(town || '')
      setCountry(country || '')
    },
    [description, zipCode, town, country],
  )

  const handleOnBlur = () => {
    if (description !== updatedDescription || zipCode !== updatedZipCode || town !== updatedTown || country !== updatedCountry) {
      update({
        description: updatedDescription,
        zipCode: updatedZipCode,
        town: updatedTown,
        country: updatedCountry,
      })
    }
  }

  return (
    <div className="address-div">
      <Typography>{label}</Typography>
      <TextField
        label="Address"
        className="address-desc"
        value={updatedDescription}
        onChange={e => setDesc(e.target.value)}
        onBlur={handleOnBlur}
      />
      <TextField label="Zip Code" value={updatedZipCode} onChange={e => setZipCode(e.target.value)} onBlur={handleOnBlur} />
      <TextField label="Town" value={updatedTown} onChange={e => setTown(e.target.value)} onBlur={handleOnBlur} />
      <TextField label="Country" value={updatedCountry} onChange={e => setCountry(e.target.value)} onBlur={handleOnBlur} />
    </div>
  )
}
