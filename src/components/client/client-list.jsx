import React from "react";
import Paper from "@material-ui/core/Paper";
import {useDispatch, useSelector} from "react-redux";
import {getClients, getFilterClient, getSelectedClientId} from "../../selectors/client-selectors";
import {selectClient} from "../../reducer/client-reducer";
import {VirtualizedTable} from "../virtualized-table";
import "./client-list.css"

export function ConnectedClientList() {
    const dispatch = useDispatch();
    const clients = useSelector(getClients);
    const filterClient = useSelector(getFilterClient);
    const selectedClientId = useSelector(getSelectedClientId);

    return (
        <ClientList
            clients={clients}
            filterClient={filterClient}
            selectedClientId={selectedClientId}
            handleSelectClient={(clientId) => dispatch(selectClient(clientId))}
        />
    );
}

const headColumns = [
    {dataKey: "firstName", label: "First Name", width: 200},
    {dataKey: "lastName", label: "Last Name", width: 200},
    {dataKey: "active", label: "Active", width: 100, boolean: true},
    {dataKey: "company", label: "Company", width: 200},
    {dataKey: "dtcf_contact", label: "DTCF Contact", width: 200},
    {dataKey: "country", label: "Country", width: 150},
    {dataKey: "comment", label: "Comment", width: 300},
];

export function ClientList({clients, filterClient, handleSelectClient}) {

    function filteredClients() {
        if (filterClient !== '') {
            const regex = new RegExp(filterClient, 'g');
            return clients.filter(client => {
                return regex.test(client.data.firstName) ||
                    regex.test(client.data.lastName) ||
                    regex.test(client.data.country) ||
                    regex.test(client.data.comment) ||
                    regex.test(client.data.company) ||
                    regex.test(client.data.dtcf_contact)
            });
        } else return clients
    }

    const data = filteredClients().map(client => {
        return {
            id: client.id,
            firstName: client.data.firstName,
            lastName: client.data.lastName,
            country: client.data.addresses?.pro?.country || client.data.addresses?.perso?.country,
            dtcf_contact: client.data.dtcf_contact,
            comment: client.data.comment,
            company: client.data.company,
            active: client.data.active
        }
    });

    return (
        <Paper className="client-list">
            <VirtualizedTable
                rowCount={data.length}
                data={data}
                columns={headColumns}
                onRowClick={({index}) => handleSelectClient(data[index].id)}
            />
        </Paper>
    );
}