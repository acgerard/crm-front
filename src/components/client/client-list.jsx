import React, {useState} from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {useDispatch, useSelector} from "react-redux";
import {getClients, getFilterClient, getSelectedClientId} from "../../selectors/client-selectors";
import {selectClient} from "../../reducer/client-reducer";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

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

export function ClientList({clients, filterClient, selectedClientId, handleSelectClient}) {
    const headColumns = [
        {id: "name.first", label: "First Name"},
        {id: "name.last", label: "Last Name"},
        {id: "active", label: "Active"},
        {id: "company", label: "Company"},
        {id: "dtcf_contact", label: "DTCF Contact"},
        {id: "country", label: "Country"},
        {id: "comment", label: "Comment"},
    ];

    const [orderBy, setOrderBy] = useState(headColumns[0].id);
    const [order, setOrder] = useState('asc');


    const handleRequestSort = property => () => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    function filteredClients() {
        if (filterClient !== '') {
            const regex = new RegExp(filterClient, 'g');
            return clients.filter(client => {
                return regex.test(client.name.first) ||
                    regex.test(client.name.last) ||
                    regex.test(client.name.email)
            });
        } else return clients
    }


    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headColumns.map(column => {
                            return <TableCell
                                sortDirection={orderBy === column.id ? order : false}
                                key={column.id}
                            >
                                <TableSortLabel
                                    active={orderBy === column.id}
                                    direction={orderBy === column.id ? order : 'asc'}
                                    onClick={handleRequestSort(column.id)}
                                >
                                    {column.label}
                                </TableSortLabel>
                            </TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stableSort(filteredClients(), getComparator(order, orderBy)).map(client => {
                        const isSelected = client._id === selectedClientId;
                        return (
                            <TableRow
                                key={client._id}
                                hover
                                onClick={() => handleSelectClient(client._id)}
                                selected={isSelected}
                            >
                                <TableCell component="th" scope="row">{client.name.first}</TableCell>
                                <TableCell>{client.name.last}</TableCell>
                                <TableCell>{client.active ? <CheckIcon/> : <ClearIcon/>}</TableCell>
                                <TableCell>{client.company}</TableCell>
                                <TableCell>{client.dtcf_contact}</TableCell>
                                <TableCell>{client.country}</TableCell>
                                <TableCell>{client.comment}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


function descendingComparator(a, b, orderBy) {
    const properties = orderBy.split('.');
    let valueA = a;
    let valueB = b;
    properties.forEach(prop => {
        valueA = valueA[prop];
        valueB = valueB[prop];
    });
    if (valueB < valueA) {
        return -1;
    }
    if (valueB > valueA) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
