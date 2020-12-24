import React, { useReducer, createContext } from 'react';
import {FETCH_CLIENTS_SUCCESS} from "../actions/client-actions";

export const ClientContext = createContext();

const initialState = {
    clients: [],
    client: {}, // selected or new
    message: {}, // { type: 'success|fail', title:'Info|Error' content:'lorem ipsum'}
};

function reducer(state, action) {
    console.log("ACTION ", action);
    switch (action.type) {
        case FETCH_CLIENTS_SUCCESS: {
            return {
                ...state,
                clients: action.payload,
            };
        }
        case 'FLASH_MESSAGE': {
            return {
                ...state,
                message: action.payload,
            };
        }
        default:
            throw new Error();
    }
}

export const ClientContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { children } = props;

    return (
        <ClientContext.Provider value={[state, dispatch]}>
            {children}
        </ClientContext.Provider>
    );
};
