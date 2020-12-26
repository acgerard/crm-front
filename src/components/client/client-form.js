import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSelectedClient} from "../../selectors/client-selectors";
import {updateClient} from "../../actions/client-actions";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    form: {
        display: "grid",
        "width": "600px",
        "grid-template-columns": "auto auto",
        "column-gap": "8px",
        "row-gap": "8px"
    },
    email: {
        "grid-column": "span 2"
    }
}));

export function ClientForm() {
    const classes = useStyles();
    const client = useSelector(getSelectedClient);
    const dispatch = useDispatch();
    const [updatedClient, setUpdatedClient] = useState({});
    const [toUpdate, setToUpdate] = useState(false);

    useEffect(function () {
            setToUpdate(false);
            setUpdatedClient(
                {
                    firstName: client.name.first,
                    lastName: client.name.last,
                    email: client.email
                }
            )
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
                    name: {first: updatedClient.firstName, last: updatedClient.lastName},
                    email: updatedClient.email
                }
            }));
        }
    };

    return (<div className={classes.form}>
        <TextField
            id="client-name-first"
            label="First Name"
            required={true}
            value={updatedClient.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            onBlur={update}
        />
        <TextField
            id="client-name-last"
            label="Last Name"
            required={true}
            value={updatedClient.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            onBlur={update}
        />
        <TextField
            id="client-email"
            className={classes.email}
            label="email"
            required={true}
            value={updatedClient.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={update}
        />
    </div>);
}