import React from "react";

export function ClientList({ clients }) {
    return (
        <div>
            <ul>{clients.map(client => {
                return (
                    <li key={client._id}>
                        {client.name.first} {client.name.last}
                    </li>
                );
            })}
            </ul>
        </div>
    );
}