import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSelectedClient} from "../../selectors/client-selectors";
import {deleteClient, updateClient} from "../../actions/client-actions";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionDetails from "@material-ui/core/AccordionDetails";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const useStyles = makeStyles(() => ({
    form: {
        display: "grid",
        "width": "600px",
        "grid-template-columns": "auto auto",
        "column-gap": "1rem",
        "row-gap": "1rem",
        margin: "3rem"
    },
    accordionSummary: {
        display: "flex",
        "flex-direction": "column"
    },
    accordionDetail: {
        display: "grid",
        "grid-template-columns": "auto auto",
        "column-gap": "1rem",
        "row-gap": "1rem",
    },
    wholeLine: {
        "grid-column": "span 2"
    },
    firstName:{
        "grid-row-start":"2"
    }

}));

const emptyClient = {
    title: '',
    firstName: '',
    lastName: '',
    emailPro: '',
    emailPerso: '',
    active: false,
    newsletter: false,
    dtcf_contact: '',
    comment: '',
    ad_pro_desc: '',
    ad_pro_zipCode: '',
    ad_pro_country: '',
    ad_pro_town: '',
    ad_perso_desc: '',
    ad_perso_zipCode: '',
    ad_perso_country: '',
    ad_perso_town: '',
    company: '',
    phone: ''
};

export function ClientForm() {
    const classes = useStyles();
    const client = useSelector(getSelectedClient);
    const dispatch = useDispatch();
    const [updatedClient, setUpdatedClient] = useState(emptyClient);
    const [toUpdate, setToUpdate] = useState(false);

    useEffect(function () {
            setToUpdate(false);
            if (client) {
                setUpdatedClient(
                    {
                        title: client.title || '',
                        firstName: client.name.first,
                        lastName: client.name.last,
                        emailPro: client.email?.pro,
                        emailPerso: client.email?.perso,
                        active: client.active || false,
                        newsletter: client.newsletter || false,
                        dtcf_contact: client.dtcf_contact,
                        comment: client.comment,
                        ad_pro_desc: client.address?.pro?.description,
                        ad_pro_zipCode: client.address?.pro?.zipCode,
                        ad_pro_country: client.address?.pro?.country,
                        ad_pro_town: client.address?.pro?.town,
                        ad_perso_desc: client.address?.perso?.description,
                        ad_perso_zipCode: client.address?.perso?.zipCode,
                        ad_perso_country: client.address?.perso?.country,
                        ad_perso_town: client.address?.perso?.town,
                        company: client.company,
                        phone: client.phone
                    }
                )
            } else {
                setUpdatedClient({});
            }

        },
        [client]
    );

    const handleChange = (property, value) => {
        if (updatedClient[property] !== value) {
            setToUpdate(true);
            const updated = {...updatedClient};
            updated[property] = value;
            setUpdatedClient(updated);
        }
    };

    const update = () => {
        if (toUpdate) {
            setToUpdate(false);
            dispatch(updateClient({
                id: client._id,
                client: {
                    title: updatedClient.title,
                    name: {first: updatedClient.firstName, last: updatedClient.lastName},
                    email: {pro: updatedClient.emailPro, perso: updatedClient.emailPerso},
                    active: updatedClient.active,
                    newsletter: updatedClient.newsletter,
                    dtcf_contact: updatedClient.dtcf_contact,
                    comment: updatedClient.comment,
                    company: updatedClient.company,
                    phone: updatedClient.phone,
                    address: {
                        pro: {
                            description: updatedClient.ad_pro_desc,
                            zipCode: updatedClient.ad_pro_zip_code,
                            country: updatedClient.ad_pro_country,
                            town: updatedClient.ad_pro_town
                        },
                        perso: {
                            description: updatedClient.ad_perso_desc,
                            zipCode: updatedClient.ad_perso_zip_code,
                            country: updatedClient.ad_perso_country,
                            town: updatedClient.ad_perso_town
                        },
                    }
                }
            }));
        }
    };

    const handleDelete = () => {
        // TODO add confirmation dialog
        dispatch(deleteClient(client._id))
    };

    return (<div className={classes.form}>
        <Toolbar className={classes.wholeLine}>
            <Typography
                variant="h3"
                gutterBottom
            >
                {`${updatedClient.firstName} ${updatedClient.lastName}`}
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
                checked={updatedClient.active}
                onChange={(e) => handleChange("active", e.target.value)}
                onBlur={update}
            />}
            label="Active"
        />
        <Accordion className={classes.wholeLine}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <div className={classes.accordionSummary}>
                    <Typography>{updatedClient.title + ' ' + updatedClient.firstName + ' ' + updatedClient.lastName}</Typography>
                    <Typography>{getSummaryLabel('Phone', updatedClient.phone) + getSummaryLabel('Email', updatedClient.emailPerso)}</Typography>
                    <Typography>{getSummaryLabel('Company', updatedClient.company) + getSummaryLabel('Email', updatedClient.emailPro)}</Typography>
                </div>

            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetail}>
                <FormControl>
                    <InputLabel id="client-title-label">Title</InputLabel>
                    <Select
                        labelId="client-title-label"
                        id="client-title-select"
                        value={updatedClient.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        onBlur={update}
                    >
                        <MenuItem value={"Mr"}>Mr</MenuItem>
                        <MenuItem value={"Mme"}>Mme</MenuItem>
                    </Select>
                </FormControl>
                <div/>
                <TextField
                    id="client-name-first"
                    label="First Name"
                    value={updatedClient.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    onBlur={update}
                />
                <TextField
                    id="client-name-last"
                    label="Last Name"
                    value={updatedClient.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    onBlur={update}
                />
                <TextField
                    id="client-phone"
                    label="Phone"
                    value={updatedClient.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    onBlur={update}
                />
                <TextField
                    id="client-email-perso"
                    label="Personal Email"
                    value={updatedClient.emailPerso}
                    onChange={(e) => handleChange("emailPerso", e.target.value)}
                    onBlur={update}
                />
                <TextField
                    id="client-company"
                    label="Company"
                    value={updatedClient.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    onBlur={update}
                />
                <TextField
                    id="client-email-pro"
                    label="Professional Email"
                    value={updatedClient.emailPro}
                    onChange={(e) => handleChange("emailPro", e.target.value)}
                    onBlur={update}
                />
            </AccordionDetails>
        </Accordion>
        <Accordion className={classes.wholeLine}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Addresses</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetail}>
                <Typography  className={classes.wholeLine}>Professional address</Typography>
                <AddressForm
                    description={updatedClient.ad_pro_desc}
                    zipCode={updatedClient.ad_pro_zipCode}
                    town={updatedClient.ad_pro_town}
                    country={updatedClient.ad_pro_country}
                    onChange={(property, e) => handleChange(`ad_pro_${property}`, e.target.value)}
                    onBlur={update}
                />

                <Typography className={classes.wholeLine}>Personal address</Typography>
                <AddressForm
                    description={updatedClient.ad_perso_desc}
                    zipCode={updatedClient.ad_perso_zipCode}
                    town={updatedClient.ad_perso_town}
                    country={updatedClient.ad_perso_country}
                    onChange={(property, e) => handleChange(`ad_perso_${property}`, e.target.value)}
                    onBlur={update}
                />
            </AccordionDetails>
        </Accordion>
        <Accordion className={classes.wholeLine}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>DTCF Informations</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetail}>
                <TextField
                    id="client-contact"
                    label="DTCF Contact"
                    value={updatedClient.dtcf_contact}
                    onChange={(e) => handleChange("dtcf_contact", e.target.value)}
                    onBlur={update}
                />
                <FormControlLabel
                    control={<Checkbox
                        name="newsletter"
                        checked={updatedClient.newsletter}
                        onChange={(e) => handleChange("newsletter", e.target.value)}
                        onBlur={update}
                    />}
                    label="Newsletter"
                />
                <TextareaAutosize
                    aria-label="minimum height"
                    rowsMin={3}
                    placeholder="Comment"
                    className={classes.wholeLine}
                    value={updatedClient.comment}
                    onChange={(e) => handleChange("comment", e.target.value)}
                    onBlur={update}
                />
            </AccordionDetails>
        </Accordion>


    </div>);
}

function getSummaryLabel(label, value) {
    return value ? `${label}: ${value}` : '';
}

function AddressForm({description, zipCode, town, country, onChange, onBlur}) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <TextField
                label="Address"
                className={classes.wholeLine}
                value={description}
                onChange={(e) => onChange("desc", e.target.value)}
                onBlur={onBlur}
            />
            <TextField
                label="Zip Code"
                value={zipCode}
                onChange={(e) => onChange("zipCode", e.target.value)}
                onBlur={onBlur}
            />
            <TextField
                label="Town"
                value={town}
                onChange={(e) => onChange("town", e.target.value)}
                onBlur={onBlur}
            />
            <TextField
                label="Country"
                value={country}
                onChange={(e) => onChange("country", e.target.value)}
                onBlur={onBlur}
            />
        </React.Fragment>
    );
}