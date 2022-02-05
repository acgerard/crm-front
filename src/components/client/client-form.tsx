import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSelectedClient } from '../../selectors/client-selectors'
import { deleteClient, updateClient } from '../../actions/client-actions'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import { AddressForm } from './address-form'
import { ContactForm } from './contact-form'
import { CrmInfoForm } from './crmInfo-form'
import './client-form.css'
import { Address, Client, ClientData, ContactData, DTCFData } from '../../actions/types'

export function ConnectedClientForm() {
  const client = useSelector(getSelectedClient)
  const dispatch = useDispatch()

  const update = (clientData: ClientData) => {
    if (client) {
      dispatch(
        updateClient({
          id: client.id,
          data: clientData,
        }),
      )
    }
  }

  const handleDelete = () => {
    // TODO add confirmation dialog
    if (client) {
      dispatch(deleteClient(client.id))
    }
  }

  return client ? <ClientForm client={client} onDelete={handleDelete} onUpdate={update} /> : null
}

export function ClientForm({
  client,
  onUpdate,
  onDelete,
}: {
  client: Client
  onUpdate: (client: ClientData) => void
  onDelete: () => void
}) {
  const [updatedActive, setActive] = useState(client.data.active || false)

  useEffect(
    function () {
      setActive(client.data.active || false)
    },
    [client],
  )

  const update = (contactInfo: ContactData, crmInfo: DTCFData, proAddress?: Address, persoAddress?: Address) => {
    onUpdate({
      ...contactInfo,
      addresses: { pro: proAddress, perso: persoAddress },
      ...crmInfo,
      active: updatedActive,
    })
  }

  const getCrmInfo = () => {
    return {
      contact: client.data.contact,
      comment: client.data.comment,
      newsletter: client.data.newsletter,
    }
  }

  const getContactInfo = () => {
    return {
      title: client.data.title,
      firstName: client.data.firstName,
      lastName: client.data.lastName,
      emails: client.data.emails,
      company: client.data.company,
      phone: client.data.phone,
    }
  }

  return (
    <div className="client-form">
      <Toolbar>
        <Typography variant="h3" gutterBottom>
          {`${client.data.firstName} ${client.data.lastName}`}
        </Typography>
        <IconButton color="primary" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Toolbar>

      <FormControlLabel
        control={
          <Checkbox
            name="active"
            checked={updatedActive}
            onChange={e => setActive(e.target.checked)}
            onBlur={() => update(getContactInfo(), getCrmInfo(), client.data.addresses?.pro, client.data.addresses?.perso)}
          />
        }
        label="Active"
      />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography variant="h5">Contact</Typography>
        </AccordionSummary>
        <AccordionDetails className="client-form-details">
          <ContactForm
            title={client.data.title}
            firstName={client.data.firstName}
            lastName={client.data.lastName}
            phone={client.data.phone}
            emails={client.data.emails}
            company={client.data.company}
            update={(contact: ContactData) => update(contact, getCrmInfo(), client.data.addresses?.pro, client.data.addresses?.perso)}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography variant="h5">Addresses</Typography>
        </AccordionSummary>
        <AccordionDetails className="client-form-details client-form-addresses">
          <AddressForm
            label="Professional address"
            description={client.data.addresses?.pro?.description}
            zipCode={client.data.addresses?.pro?.zipCode}
            town={client.data.addresses?.pro?.town}
            country={client.data.addresses?.pro?.country}
            update={address => update(getContactInfo(), getCrmInfo(), address, client.data.addresses?.perso)}
          />
          <AddressForm
            label="Personal address"
            description={client.data.addresses?.perso?.description}
            zipCode={client.data.addresses?.perso?.zipCode}
            town={client.data.addresses?.perso?.town}
            country={client.data.addresses?.perso?.country}
            update={address => update(getContactInfo(), getCrmInfo(), client.data.addresses?.pro, address)}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography variant="h5">DTCF Informations</Typography>
        </AccordionSummary>
        <AccordionDetails className="client-form-details">
          <CrmInfoForm
            contact={client.data.contact}
            newsletter={client.data.newsletter}
            comment={client.data.comment}
            update={(crmInfo: DTCFData) => update(getContactInfo(), crmInfo, client.data.addresses?.pro, client.data.addresses?.perso)}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
