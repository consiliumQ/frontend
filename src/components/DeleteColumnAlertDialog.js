import React from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from '@material-ui/core';

export default function DeleteColumnAlertDialog({ shouldDeleteColumnDialogOpen, handleDeleteColumnDialogToggle }) {
    return (
        <Dialog open={shouldDeleteColumnDialogOpen} onClose={handleDeleteColumnDialogToggle}>
            <DialogTitle>{'Alert'}</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to delete this column?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary">Yes, I am sure</Button>
                <Button onClick={handleDeleteColumnDialogToggle} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
