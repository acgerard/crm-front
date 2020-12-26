import React from "react";
import {useSelector} from "react-redux";
import {getSelectedClient} from "../../selectors/client-selectors";

export function ClientForm() {
    const client = useSelector(getSelectedClient);

    return (<div>{client.name.first}</div>);
}