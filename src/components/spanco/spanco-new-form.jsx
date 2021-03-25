import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";

export function SpancoNewForm({open, onClose}) {
    return <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-product-title">Create Spanco</DialogTitle>
        <DialogContent className="product-new-dialog">
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="secondary">
                Cancel
            </Button>
            <Button
                color="primary"
                onClick={() => {
                }}
            >
                Create
            </Button>
        </DialogActions>
    </Dialog>
}