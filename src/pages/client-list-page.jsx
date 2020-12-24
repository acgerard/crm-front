import React, {useEffect} from 'react';
import {ClientList} from '../components/client-list';
import {fetchClients} from "../actions/client-actions";
import {FlashMessage} from "../components/flash-message";
import {useDispatch, useSelector} from "react-redux";
import {getClients, getError, getStatus,} from "../selectors/client-selectors";
import {STATUS} from "../reducer/client-reducer";

function ClientListPage() {
    const clients = useSelector(getClients);
    const status = useSelector(getStatus);
    const error = useSelector(getError);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);

    return (
        <div>
            {status===STATUS.ERROR && <FlashMessage error={error} />}
            <ClientList clients={clients}/>
        </div>
    );
}

export default ClientListPage;