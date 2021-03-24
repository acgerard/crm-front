import React, {useEffect} from 'react';
import {ConnectedClientList} from '../components/client/client-list';
import {createClient, fetchClients} from "../actions/client-actions";
import {FlashMessage} from "../components/flash-message";
import {useDispatch, useSelector} from "react-redux";
import {getError, getFilterClient, getStatus,} from "../selectors/client-selectors";
import {filterClient} from "../reducer/client-reducer";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from "@material-ui/core/IconButton";
import {ConnectedClientNewForm} from "../components/client/client-new-form";
import {makeStyles} from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import * as Papa from 'papaparse';
import {ClientDrawer} from "../components/client/client-drawer";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import {STATUS} from "../reducer/common";

const useStyles = makeStyles(() => ({
    buttons: {
        display: "flex",
        "justify-content": "flex-end"
    },
    toolbar: {
        display: "flex",
        "justify-content": "space-between"
    },
    input: {
        display: "none"
    },
}));

function ClientListPage() {
    const classes = useStyles();
    const status = useSelector(getStatus);
    const error = useSelector(getError);
    const filter = useSelector(getFilterClient);
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
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
                    if(line.firstName && line.lastName && line.emailPro) {
                        dispatch(createClient({name: {first: line.firstName, last: line.lastName}, email: {pro:line.email}}));
                    }
                });
            }
        });
    };

    return (
        <div>
            {status === STATUS.ERROR && <FlashMessage error={error}/>}
            <Toolbar className={classes.toolbar}>
                <TextField
                    id="client-search"
                    label="Search"
                    value={filter}
                    onChange={(e) => dispatch(filterClient(e.target.value))}/>
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
            </Toolbar>
            <ConnectedClientNewForm
                open={openDialog}
                onClose={handleClose}
            />
            <ClientDrawer/>
            <ConnectedClientList />
        </div>
    );
}

export default ClientListPage;