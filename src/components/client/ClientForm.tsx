import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteClient, updateClient } from '../../redux/client'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import { AddressForm } from './AddressForm/address-form'
import { ContactForm } from './ContactForm/contact-form'
import { CrmInfoForm } from './CrmInfoForm/crmInfo-form'
import { Address, Client, ClientData, ContactData, DTCFData } from '../../actions/types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { DefaultSidebar } from '../common/layout/DefaultSidebar'
import { useNavigate } from 'react-router-dom'
import { ConfirmDialog } from '../common/dialog/ConfirmDialog'
import { Switch } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  details: {
    marginBottom: '1rem',
  },

  addresses: {
    flexDirection: 'column',
    marginBottom: '1rem',
  },
}))

export function ClientForm({ client }: { client: Client }) {
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [updatedActive, setActive] = useState(client.data.active || false)
  const [showModal, setShowModal] = useState(false)

  useEffect(
    function () {
      setActive(client.data.active || false)
    },
    [client],
  )

  const onUpdate = (clientData: ClientData) => {
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
    if (client) {
      dispatch(deleteClient(client.id))
    }
  }

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

  const backToClients = () => {
    navigate(`/clients`)
  }

  return (
    <DefaultSidebar
      name={`${client.data.firstName} ${client.data.lastName}`}
      backAction={backToClients}
      toolbarActions={
        <Button color="secondary" variant={'contained'} startIcon={<DeleteIcon />} onClick={() => setShowModal(true)}>
          Supprimer
        </Button>
      }
    >
      <div>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={updatedActive}
              onChange={e => setActive(e.target.checked)}
              onBlur={() => update(getContactInfo(), getCrmInfo(), client.data.addresses?.pro, client.data.addresses?.perso)}
            />
          }
          label={updatedActive ? 'Actif' : 'Non actif'}
        />

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Contact</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
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
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Adresses</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.addresses}>
            <AddressForm
              label="Adresse professionnelle"
              description={client.data.addresses?.pro?.description}
              zipCode={client.data.addresses?.pro?.zipCode}
              town={client.data.addresses?.pro?.town}
              country={client.data.addresses?.pro?.country}
              update={address => update(getContactInfo(), getCrmInfo(), address, client.data.addresses?.perso)}
            />
            <AddressForm
              label="Adresse personnelle"
              description={client.data.addresses?.perso?.description}
              zipCode={client.data.addresses?.perso?.zipCode}
              town={client.data.addresses?.perso?.town}
              country={client.data.addresses?.perso?.country}
              update={address => update(getContactInfo(), getCrmInfo(), client.data.addresses?.pro, address)}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Informations DTCF</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <CrmInfoForm
              contact={client.data.contact}
              newsletter={client.data.newsletter}
              comment={client.data.comment}
              dtcfType={client.data.dtcfType}
              update={(crmInfo: DTCFData) => update(getContactInfo(), crmInfo, client.data.addresses?.pro, client.data.addresses?.perso)}
            />
          </AccordionDetails>
        </Accordion>
      </div>
      <ConfirmDialog
        open={showModal}
        title={'Supprimer client'}
        confirmLabel={'Supprimer'}
        onConfirm={handleDelete}
        onClose={() => setShowModal(false)}
      >
        <Typography>
          Cette action est définitive et supprimera le client. Cela échouera si le client est référencé dans un spanco (offre).
        </Typography>
      </ConfirmDialog>
    </DefaultSidebar>
  )
}
