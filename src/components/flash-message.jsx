import React from 'react';
import SnackbarContent from "@material-ui/core/SnackbarContent";

export function FlashMessage({ error }) {
    return (
        <SnackbarContent
            message={error.message}
        />
    );
}

