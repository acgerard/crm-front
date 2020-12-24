import React, {useEffect} from 'react';
import {ClientList} from '../components/client-list';
import {fetchClients} from "../actions/client-actions";
import {FlashMessage} from "../components/flash-message";
import {useDispatch, useSelector} from "react-redux";
import {getClients, getMessage} from "../selectors/client-selectors";

function ClientListPage() {
    const clients = useSelector(getClients);
    const message = useSelector(getMessage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchClients);
    }, [dispatch]);

    return (
        <div>
            <h1>List of Clients</h1>
            {message.content && <FlashMessage message={message} />}
            <ClientList clients={clients}/>
        </div>
    );
}

export default ClientListPage;