import {http} from "./axios-config";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
    const response = await http.get('/clients');
    return response.data.data || response.data ; // in case pagination is disabled
});

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
