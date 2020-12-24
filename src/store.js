import { configureStore } from '@reduxjs/toolkit'
import clientReducer from "./reducer/client-reducer";

const store = configureStore({
    reducer: {
        clientReducer: clientReducer
    }
});

export default store