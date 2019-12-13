import React from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from '@material-ui/core';
// import { useMutation } from '@apollo/react-hooks';
// import { queries } from '../graphql';
import Transition from './common/TransitionEffect';

export default function DeleteColumnAlertDialog({ columnId, shouldDeleteColumnDialogOpen, handleDeleteColumnDialogToggle }) {
    // const [deleteColumnMutation] = useMutation(queries.MUTATE_DELETE_COLUMN);

    // const onConfirmButtonClick = () => {
    //     deleteColumnMutation({ variables: { columnId } });
    //     handleDeleteColumnDialogToggle();
    // };

    return (
        <Dialog open={shouldDeleteColumnDialogOpen} onClose={handleDeleteColumnDialogToggle} TransitionComponent={Transition}>
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
