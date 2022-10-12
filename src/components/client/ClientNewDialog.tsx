import React, { useState } from 'react'
import { createClient } from '../../redux/client'
import { useDispatch } from 'react-redux'
import { ContactForm } from './ContactForm/contact-form'
import './ClientNewForm.css'
import { AddressForm } from './AddressForm/address-form'
import { CrmInfoForm } from './CrmInfoForm/crmInfo-form'
import { Address, ContactData, DTCFData } from '../../actions/types'
import { ConfirmDialog } from '../common/dialog/ConfirmDialog'

const initialContactInfo = {
  title: '',
  firstName: '',
  lastName: '',
  company: '',
  phone: '',
  emails: {},
}
const initialCrmInfo = { contact: '', comment: '', newsletter: false, dtcfType: undefined }
const initialAddress = { description: '', zipCode: '', town: '', country: '' }

export function ClientNewDialog({ open, onClose }: { open?: boolean; onClose?: () => void }) {
  const dispatch = useDispatch()
  const [contactInfo, setContactInfo] = useState<ContactData>(initialContactInfo)
  const [crmInfo, setCrmInfo] = useState<DTCFData>(initialCrmInfo)
  const [proAddress, setProAddress] = useState<Address>(initialAddress)
  const [persoAddress, setPersoAddress] = useState<Address>(initialAddress)

  const handleCreateClient = () => {
    dispatch(
      createClient({
        active: true,
        ...contactInfo,
        ...crmInfo,
        addresses: { pro: proAddress, perso: persoAddress },
      }),
    )
    setContactInfo(initialContactInfo)
    setCrmInfo(initialCrmInfo)
    setProAddress(initialAddress)
    setPersoAddress(initialAddress)
  }

  return (
    <ConfirmDialog title={'Créer un client'} confirmLabel={'Créer'} open={open} onClose={onClose} onConfirm={handleCreateClient}>
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
        dtcfType={crmInfo.dtcfType}
        update={crmInfo => setCrmInfo(crmInfo)}
      />
      <AddressForm
        label="Adresse professionnelle"
        description={proAddress.description}
        zipCode={proAddress.zipCode}
        town={proAddress.town}
        country={proAddress.country}
        update={address => setProAddress(address)}
      />
      <AddressForm
        label="Adresse personnelle"
        description={persoAddress.description}
        zipCode={persoAddress.zipCode}
        town={persoAddress.town}
        country={persoAddress.country}
        update={address => setPersoAddress(address)}
      />
    </ConfirmDialog>
  )
}
