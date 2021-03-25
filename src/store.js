import { configureStore } from '@reduxjs/toolkit'
import clientReducer from "./reducer/client-reducer";
import productReducer from "./reducer/product-reducer";
import spancoReducer from "./reducer/spanco-reducer";

const store = configureStore({
    reducer: {
        clientReducer: clientReducer,
        productReducer: productReducer,
        spancoReducer: spancoReducer
    }
});

export default store