import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

export function FlashMessage({ error }) {
    return (
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error.message}
        </Alert>
    );
}

