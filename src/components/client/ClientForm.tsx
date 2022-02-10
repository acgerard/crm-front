import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteClient, updateClient } from '../../actions/client-actions'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import { AddressForm } from './AddressForm/address-form'
import { ContactForm } from './ContactForm/contact-form'
import { CrmInfoForm } from './CrmInfoForm/crmInfo-form'
import { Address, Client, ClientData, ContactData, DTCFData } from '../../actions/types'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles(theme => ({
  actions: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '1fr auto',
    marginBottom: theme.spacing(2),
  },
  button: {
    color: theme.palette.error.main,
    // backgroundColor: theme.palette.error.dark,
  },
  title: {
    marginBottom: theme.spacing(4),
  },

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
  const [updatedActive, setActive] = useState(client.data.active || false)
  const dispatch = useDispatch()

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

  const onDelete = () => {
    // TODO add confirmation dialog
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

  return (
    <div>
      <Typography variant="h4" className={classes.title}>{`${client.data.firstName} ${client.data.lastName}`}</Typography>

      <div className={classes.actions}>
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
        <IconButton className={classes.button} onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
        {/*<Button className={classes.button} variant={'contained'} startIcon={<DeleteIcon />} onClick={onDelete}>*/}
        {/* Delete */}
        {/*</Button>*/}
      </div>

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
          <Typography variant="h6">Addresses</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.addresses}>
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
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">DTCF Informations</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
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
