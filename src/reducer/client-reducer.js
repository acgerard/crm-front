import {FETCH_CLIENTS_SUCCESS} from "../actions/client-actions";

const initialState = {
    clients: [],
    client: {}, // selected or new
    message: {}, // { type: 'success|fail', title:'Info|Error' content:'lorem ipsum'}
};

export default function clientReducer(state = initialState, action) {
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
            return state;
    }
}
