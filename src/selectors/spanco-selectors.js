import {spancoAdapter} from "../reducer/spanco-reducer";

export const {
    selectAll: getSpancos,
    selectById: getSpancoByPromoAndCode,
    selectEntities: getSpancosByPromoAndCode
} = spancoAdapter.getSelectors((state) => state.spancoReducer);

export function getSpancosStatus(state) {
    return state.spancoReducer.status;
}

export function getSpancosError(state) {
    return state.spancoReducer.error;
}

export function getProductSelected(state) {
    return state.spancoReducer.selectedProduct;
}
