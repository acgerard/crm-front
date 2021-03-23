import React, {useEffect, useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import "./contact-form.css";

export function ContactForm({title, firstName, lastName, company, phone, proEmail, persoEmail, update}) {
    const [updatedTitle, setTitle] = useState(title || '');
    const [updatedFirstName, setFirstName] = useState(firstName || '');
    const [updatedLastName, setLastName] = useState(lastName || '');
    const [updatedCompany, setCompany] = useState(company || '');
    const [updatedPhone, setPhone] = useState(phone || '');
    const [updatedProEmail, setProEmail] = useState(proEmail || '');
    const [updatedPersoEmail, setPersoEmail] = useState(persoEmail || '');

    useEffect(function () {
            setTitle(title || '');
            setFirstName(firstName || '');
            setLastName(lastName || '');
            setCompany(company || '');
            setPhone(phone || '');
            setProEmail(proEmail || '');
            setPersoEmail(persoEmail || '');
        }
        , [title, firstName, lastName, company, phone, proEmail, persoEmail]);

    const handleOnBlur = () => {
        if (title !== updatedTitle ||
            firstName !== updatedFirstName ||
            lastName !== updatedLastName ||
            company !== updatedCompany ||
            phone !== updatedPhone ||
            proEmail !== updatedProEmail ||
            persoEmail !== updatedPersoEmail
        ) {
            update({
                title: updatedTitle,
                firstName: updatedFirstName,
                lastName: updatedLastName,
                company: updatedCompany,
                phone: updatedPhone,
                email: {pro: getEmail(updatedProEmail), perso: getEmail(updatedPersoEmail)}
            });
        }
    };

    const getEmail = (email) => (email === '') ? null : email;

    return (<div className="contact-div">
        <FormControl>
            <InputLabel id="client-title-label">Title</InputLabel>
            <Select
                labelId="client-title-label"
                id="client-title-select"
                value={updatedTitle}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleOnBlur}
            >
                <MenuItem value={"Mr"}>Mr</MenuItem>
                <MenuItem value={"Mme"}>Mme</MenuItem>
            </Select>
        </FormControl>
        <div/>
        <TextField
            id="client-name-first"
            label="First Name"
            value={updatedFirstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={handleOnBlur}
        />
        <TextField
            id="client-name-last"
            label="Last Name"
            value={updatedLastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={handleOnBlur}
        />
        <TextField
            id="client-phone"
            label="Phone"
            value={updatedPhone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={handleOnBlur}
        />
        <TextField
            id="client-email-perso"
            label="Personal Email"
            value={updatedPersoEmail}
            onChange={(e) => setPersoEmail(e.target.value)}
            onBlur={handleOnBlur}
        />
        <TextField
            id="client-company"
            label="Company"
            value={updatedCompany}
            onChange={(e) => setCompany(e.target.value)}
            onBlur={handleOnBlur}
        />
        <TextField
            id="client-email-pro"
            label="Professional Email"
            value={updatedProEmail}
            onChange={(e) => setProEmail(e.target.value)}
            onBlur={handleOnBlur}
        />
    </div>);
}