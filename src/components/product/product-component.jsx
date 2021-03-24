import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {ProductForm} from "./product-form";
import React from "react";

export function ProductComponent({product}) {

    return <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
            id={product.code}
        >
                <Typography>{`${product.code} - ${product.name}`}</Typography>

        </AccordionSummary>
        <AccordionDetails>
            <ProductForm product={product}/>
        </AccordionDetails>
    </Accordion>
}