import { configureStore } from '@reduxjs/toolkit'
import clientReducer from "./reducer/client-reducer";
import productReducer from "./reducer/product-reducer";

const store = configureStore({
    reducer: {
        clientReducer: clientReducer,
        productReducer: productReducer
    }
});

export default store