import {productsAdapter} from "../reducer/product-reducer";

export const {
    selectAll: getProducts,
    selectById: getProductByCode,
    selectEntities: getProductsByCode
} = productsAdapter.getSelectors((state) => state.productReducer);

export function getProductsStatus(state) {
    return state.productReducer.status;
}

export function getProductsError(state) {
    return state.productReducer.error;
}
