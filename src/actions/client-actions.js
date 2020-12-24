import axios from "axios";

export const http = axios.create({
    baseURL: 'http://localhost:3030',
    timeout: 1000,
    headers: {'Content-type': 'application/json', 'Accept': 'application/json'}
});

export const FETCH_CLIENTS_SUCCESS = "FETCH_CLIENTS_SUCCESS";

export const fetchClientSuccess = (clients) => {
    return {type: FETCH_CLIENTS_SUCCESS, payload: clients}
};

export async function fetchClients(dispatch) {
    try {
        const response = await http.get('/clients');
        dispatch(fetchClientSuccess(response.data.data || response.data)); // in case pagination is disabled
    } catch (error) {
        flashErrorMessage(dispatch, error);
    }
}

export const flashErrorMessage = (dispatch, error) => {
    const err = error.response ? error.response.data : error; // check if server or network error
    dispatch({
        type: 'FLASH_MESSAGE',
        payload: {
            type: 'fail',
            title: err.name,
            content: err.message,
        },
    });
};
