import React from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from '@material-ui/core';
import Transition from './common/TransitionEffect';

export default function DeleteTaskAlertDialog({ shouldDeleteTaskAlertOpen, handleDeleteTaskFormToggle }) {
    return (
        <Dialog open={shouldDeleteTaskAlertOpen} onClose={handleDeleteTaskFormToggle} TransitionComponent={Transition}>
            <DialogTitle>{'Alert'}</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to delete this task?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeleteTaskFormToggle} color="primary">
                    Yes, I am sure
                </Button>
                <Button onClick={handleDeleteTaskFormToggle} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
