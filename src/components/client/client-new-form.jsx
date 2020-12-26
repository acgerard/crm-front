import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import {createClient} from "../../actions/client-actions";
import {makeStyles} from "@material-ui/core";
import {useDispatch} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = makeStyles((theme) => ({
    form: {
        display: "grid",
        "grid-template-columns": "auto auto",
        "column-gap": "8px",
        "row-gap": "8px"
    },
    email: {
        "grid-column": "span 2"
    }
}));

export function ClientNewForm({open, onClose}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");


    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create Client</DialogTitle>
            <DialogContent className={classes.form}>
                <TextField
                    id="client-name-first"
                    label="First Name"
                    required={true}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    id="client-name-last"
                    label="Last Name"
                    required={true}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    id="client-email"
                    className={classes.email}
                    label="email"
                    required={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button
                    color="primary"
                    onClick={() => {
                        dispatch(createClient({name: {first: firstName, last: lastName}, email}));
                        onClose();
                    }}
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}