import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { createClient } from '../../actions/client-actions'
import { useDispatch } from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import { ContactForm } from './contact-form'
import './client-new-form.css'
import { AddressForm } from './address-form'
import { CrmInfoForm } from './crmInfo-form'
import { Address, ClientData, ContactData, DTCFData } from '../../actions/types'

export function ConnectedClientNewForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dispatch = useDispatch()
  return <ClientNewForm open={open} onClose={onClose} handleCreate={(client: ClientData) => dispatch(createClient(client))} />
}

export function ClientNewForm({
  open,
  onClose,
  handleCreate,
}: {
  open: boolean
  onClose: () => void
  handleCreate: (clientData: ClientData) => void
}) {
  const [contactInfo, setContactInfo] = useState<ContactData>({
    title: '',
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    emails: {},
  })
  const [crmInfo, setCrmInfo] = useState<DTCFData>({ contact: '', comment: '', newsletter: false, dtcfType: undefined })
  const [proAddress, setProAddress] = useState<Address>({ description: '', zipCode: '', town: '', country: '' })
  const [persoAddress, setPersoAddress] = useState<Address>({ description: '', zipCode: '', town: '', country: '' })

  const handleCreateClient = () => {
    handleCreate({
      active: true,
      ...contactInfo,
      ...crmInfo,
      addresses: { pro: proAddress, perso: persoAddress },
    })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create Client</DialogTitle>
      <DialogContent className="client-new-dialog">
        <ContactForm
          title={contactInfo.title}
          firstName={contactInfo.firstName}
          lastName={contactInfo.lastName}
          company={contactInfo.company}
          emails={contactInfo.emails}
          phone={contactInfo.phone}
          update={updated => setContactInfo(updated)}
        />
        <CrmInfoForm
          contact={crmInfo.contact}
          newsletter={crmInfo.newsletter}
          comment={crmInfo.comment}
          update={crmInfo => setCrmInfo(crmInfo)}
        />
        <AddressForm
          label="Professional address"
          description={proAddress.description}
          zipCode={proAddress.zipCode}
          town={proAddress.town}
          country={proAddress.country}
          update={address => setProAddress(address)}
        />
        <AddressForm
          label="Personal address"
          description={persoAddress.description}
          zipCode={persoAddress.zipCode}
          town={persoAddress.town}
          country={persoAddress.country}
          update={address => setPersoAddress(address)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button color="primary" onClick={handleCreateClient}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}
