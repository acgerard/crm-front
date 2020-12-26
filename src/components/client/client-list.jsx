import React, {useState} from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableSortLabel from "@material-ui/core/TableSortLabel";

export function ClientList({clients}) {
    const headColumns = [
        {id: "firstName", label: "First Name"},
        {id: "lastName", label: "Last Name"},
        {id: "email", label: "email"}
    ];

    const [orderBy, setOrderBy] = useState(headColumns[0].id);
    const [order, setOrder] = useState('asc');

    const handleRequestSort = property => (event) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


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
                                    {/*{orderBy === column.id ? (*/}
                                    {/*    <span className={classes.visuallyHidden}>*/}
                                    {/*        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}*/}
                                    {/*    </span>*/}
                                    {/*) : null}*/}
                                </TableSortLabel>
                            </TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stableSort(clients, getComparator(order, orderBy)).map(client => (
                        <TableRow key={clients._id}>
                            <TableCell component="th" scope="row">{client.firstName}</TableCell>
                            <TableCell>{client.lastName}</TableCell>
                            <TableCell>{client.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
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
