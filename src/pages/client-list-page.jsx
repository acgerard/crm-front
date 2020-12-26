import React, {useEffect} from 'react';
import {ClientList} from '../components/client/client-list';
import {createClient, fetchClients} from "../actions/client-actions";
import {FlashMessage} from "../components/flash-message";
import {useDispatch, useSelector} from "react-redux";
import {getClients, getError, getStatus,} from "../selectors/client-selectors";
import {STATUS} from "../reducer/client-reducer";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from "@material-ui/core/IconButton";
import {ClientNewForm} from "../components/client/client-new-form";
import {makeStyles} from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import * as Papa from 'papaparse';

const useStyles = makeStyles(() => ({
    buttons: {
        display: "flex",
        "justify-content": "flex-end"
    },
    input: {
        display: "none"
    }
}));

function ClientListPage() {
    const classes = useStyles();
    const clients = useSelector(getClients);
    const status = useSelector(getStatus);
    const error = useSelector(getError);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);

    const handleFile= (e) => {
        const files = Array.from(e.target.files);
        Papa.parse(files[0], {
            header:true,
            complete: function(results) {
                results.data.forEach( line => {
                    if(line.firstName && line.lastName && line.email) {
                        dispatch(createClient({name: {first: line.firstName, last: line.lastName}, email: line.email}));
                    }
                });
            }
        });
    };

    return (
        <div>
            {status === STATUS.ERROR && <FlashMessage error={error}/>}
            <div className={classes.buttons}>
                <IconButton
                    color="primary"
                    onClick={handleOpen}
                >
                    <AddCircleOutlineIcon/>
                </IconButton>

                <input accept=".csv" className={classes.input} id="upload-clients" type="file" onChange={handleFile}/>
                <label htmlFor="upload-clients">
                    <IconButton color="primary" component="span">
                        <CloudUploadIcon />
                    </IconButton>
                </label>

            </div>
            <ClientNewForm
                open={open}
                onClose={handleClose}
            />
            <ClientList clients={clients}/>
        </div>
    );
}

export default ClientListPage;