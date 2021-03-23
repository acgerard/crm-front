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
            id: client.id,
            data: {
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
        dispatch(deleteClient(client.id))
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
    const [updatedActive, setActive] = useState(client?.data.active || false);

    useEffect(function () {
            setActive(client?.data.active || false);
        },
        [client]
    );

    const getCrmInfo = () => {
        return {
            contact: client?.data.contact,
            comment: client?.data.comment,
            newsletter: client?.data.newsletter
        }
    };

    const getContactInfo = () => {
        return {
            title: client?.data.title,
            firstName: client?.data.firstName,
            lastName: client?.data.lastName,
            email: client?.data.email,
            company: client?.data.company,
            phone: client?.data.phone,
        }
    };

    return (<div className="client-form">
        <Toolbar>
            <Typography
                variant="h3"
                gutterBottom
            >
                {`${client?.data.firstName} ${client?.data.lastName}`}
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
                onBlur={() => update(getContactInfo(), client?.data.address?.pro, client?.data.address?.perso, getCrmInfo(), updatedActive)}
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
                    title={client?.data.title}
                    firstName={client?.data.firstName}
                    lastName={client?.data.lastName}
                    phone={client?.data.phone}
                    persoEmail={client?.data.email?.perso}
                    company={client?.data.company}
                    proEmail={client?.data.email?.pro}
                    update={(contact) => update(contact, client?.data.address?.pro, client?.data.address?.perso, getCrmInfo(), updatedActive)}
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
                    description={client?.data.address?.pro?.description}
                    zipCode={client?.data.address?.pro?.zipCode}
                    town={client?.data.address?.pro?.town}
                    country={client?.data.address?.pro?.country}
                    update={(address) => update(getContactInfo(), address, client?.data.address?.perso, getCrmInfo(), updatedActive)}
                />
                <AddressForm
                    label="Personal address"
                    description={client?.data.address?.perso?.description}
                    zipCode={client?.data.address?.perso?.zipCode}
                    town={client?.data.address?.perso?.town}
                    country={client?.data.address?.perso?.country}
                    update={(address) => update(getContactInfo(), client?.data.address?.pro, address, getCrmInfo(), updatedActive)}
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
                    contact={client?.data.contact}
                    newsletter={client?.data.newsletter}
                    comment={client?.data.comment}
                    update={(crmInfo) => update(getContactInfo(), client?.data.address?.pro, client?.data.address?.perso, crmInfo, updatedActive)}
                />
            </AccordionDetails>
        </Accordion>


    </div>);
}