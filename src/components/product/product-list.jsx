import React from "react";
import {getProducts} from "../../selectors/product-selectors";
import {useSelector} from "react-redux";
import {Typography} from "@material-ui/core";
import {ProductComponent} from "./product-component";

export function ProductList() {
    const products = useSelector(getProducts);

    return <div>
        {products.length === 0 && <Typography>No products to display</Typography>}
        {products.map(product => <ProductComponent key={product.code} product={product}/>)}
    </div>;
}

