import React, {useEffect} from 'react';
import {ClientList} from '../components/client-list';
import {fetchClients} from "../actions/client-actions";
import {FlashMessage} from "../components/flash-message";
import {useDispatch, useSelector} from "react-redux";
import {getClients, getMessage, getStatus,} from "../selectors/client-selectors";
import {STATUS} from "../reducer/client-reducer";

function ClientListPage() {
    const clients = useSelector(getClients);
    const status = useSelector(getStatus);
    const message = useSelector(getMessage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);

    return (
        <div>
            <h1>List of Clients</h1>
            {status===STATUS.ERROR && <FlashMessage message={{type:'error', content: message, title: 'Error'}} />}
            <ClientList clients={clients}/>
        </div>
    );
}

export default ClientListPage;