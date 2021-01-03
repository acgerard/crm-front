import React, {useEffect, useState} from "react";
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
                return regex.test(client.name.first) ||
                    regex.test(client.name.last) ||
                    regex.test(client.country) ||
                    regex.test(client.comment) ||
                    regex.test(client.company) ||
                    regex.test(client.dtcf_contact)
            });
        } else return clients
    }

    const data = filteredClients().map(client => {
        return {
            _id: client._id,
            firstName: client.name.first,
            lastName: client.name.last,
            country: client.addresses?.pro?.country || client.addresses?.perso?.country,
            dtcf_contact: client.dtcf_contact,
            comment: client.comment,
            company: client.company,
            active: client.active
        }
    });

    return (
        <Paper className="client-list">
            <VirtualizedTable
                rowCount={data.length}
                data={data}
                columns={headColumns}
                onRowClick={({index}) => handleSelectClient(data[index]._id)}
            />
        </Paper>
    );
}