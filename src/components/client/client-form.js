import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSelectedClient} from "../../selectors/client-selectors";
import {deleteClient, updateClient} from "../../actions/client-actions";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {AddressForm} from "./address-form";
import {ContactForm} from "./contact-form";
import {CrmInfoForm} from "./crmInfo-form";
import "./client-form.css";

export function ConnectedClientForm() {
    const client = useSelector(getSelectedClient);
    const dispatch = useDispatch();

    const update = (contact, proAddress, persoAddress, crmInfo, active) => {
        dispatch(updateClient({
            id: client._id,
            client: {
                ...contact,
                ...crmInfo,
                active: active,
                address: {
                    pro: proAddress,
                    perso: persoAddress,
                }
            }
        }));
    };

    const handleDelete = () => {
        // TODO add confirmation dialog
        dispatch(deleteClient(client._id))
    };

    return (
        <ClientForm
            client={client}
            handleDelete={handleDelete}
            update={update}
        />
    );
}

export function ClientForm({client, update, handleDelete}) {
    const [updatedActive, setActive] = useState(client?.active || false);

    useEffect(function () {
            setActive(client?.active || false);
        },
        [client]
    );

    const getCrmInfo = () => {
        return {
            contact: client.dtcf_contact,
            comment: client.comment,
            newsletter: client.newsletter
        }
    };

    const getContactInfo = () => {
        return {
            title: client.title,
            name: client.name,
            email: client.email,
            company: client.company,
            phone: client.phone,
        }
    };

    return (<div className="client-form">
        <Toolbar>
            <Typography
                variant="h3"
                gutterBottom
            >
                {`${client?.name?.first} ${client?.name?.last}`}
            </Typography>
            <IconButton
                color="primary"
                onClick={handleDelete}
            >
                <DeleteIcon/>
            </IconButton>
        </Toolbar>

        <FormControlLabel
            control={<Checkbox
                name="active"
                checked={updatedActive}
                onChange={(e) => setActive(e.target.checked)}
                onBlur={() => update(getContactInfo(), client.address?.pro, client.address?.perso, getCrmInfo(), updatedActive)}
            />}
            label="Active"
        />
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h5">Contact</Typography>
            </AccordionSummary>
            <AccordionDetails className="client-form-details">
                <ContactForm
                    title={client.title}
                    firstName={client.name?.first}
                    lastName={client.name?.last}
                    phone={client.phone}
                    persoEmail={client.email?.perso}
                    company={client.company}
                    proEmail={client.email?.pro}
                    update={(contact) => update(contact, client.address?.pro, client.address?.perso, getCrmInfo(), updatedActive)}
                />
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h5">Addresses</Typography>
            </AccordionSummary>
            <AccordionDetails className="client-form-details client-form-addresses">
                <AddressForm
                    label="Professional address"
                    description={client.address?.pro?.description}
                    zipCode={client.address?.pro?.zipCode}
                    town={client.address?.pro?.town}
                    country={client.address?.pro?.country}
                    update={(address) => update(getContactInfo(), address, client.address?.perso, getCrmInfo(), updatedActive)}
                />
                <AddressForm
                    label="Personal address"
                    description={client.address?.perso?.description}
                    zipCode={client.address?.perso?.zipCode}
                    town={client.address?.perso?.town}
                    country={client.address?.perso?.country}
                    update={(address) => update(getContactInfo(), client.address?.pro, address, getCrmInfo(), updatedActive)}
                />
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h5">DTCF Informations</Typography>
            </AccordionSummary>
            <AccordionDetails className="client-form-details">
                <CrmInfoForm
                    contact={client.dtcf_contact}
                    newsletter={client.newsletter}
                    comment={client.comment}
                    update={(crmInfo) => update(getContactInfo(), client.address?.pro, client.address?.perso, crmInfo, updatedActive)}
                />
            </AccordionDetails>
        </Accordion>


    </div>);
}