import {Button, Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import React from "react";


export const DeleteUserPopup = (props) => {
    return (
        <Dialog
            open={props.openDelete}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Delete ID {props.selectedRow}?</DialogTitle>
            <DialogActions>
                <Button onClick={props.handleCloseDelete} color="primary"
                        variant="contained">
                    Cancel
                </Button>
                <Button onClick={props.handleDeleteUser} color="primary"
                        variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}