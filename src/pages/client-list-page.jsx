import React, {useContext, useEffect} from 'react';
import {ClientList} from '../components/client-list';
import {ClientContext} from "../context/client-context";
import {fetchClients} from "../actions/client-actions";
import {FlashMessage} from "../components/flash-message";

function ClientListPage() {
    const [state, dispatch] = useContext(ClientContext);

    useEffect(() => {
        fetchClients(dispatch);
    }, []);

    return (
        <div>
            <h1>List of Clients</h1>
            {state.message.content && <FlashMessage message={state.message} />}
            <ClientList clients={state.clients}/>
        </div>
    );
}

export default ClientListPage;