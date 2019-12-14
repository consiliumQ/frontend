import React from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { queries } from '../graphql';
import Transition from './common/TransitionEffect';

export default function DeleteTaskAlertDialog({ taskId, shouldDeleteTaskAlertOpen, handleDeleteTaskFormToggle }) {
    const [deleteTaskMutation] = useMutation(queries.MUTATE_DELETE_TASK);

    const onConfirmButtonClick = () => {
        deleteTaskMutation({ variables: { taskId } });
        handleDeleteTaskFormToggle();
    };
    return (
        <Dialog open={shouldDeleteTaskAlertOpen} onClose={handleDeleteTaskFormToggle} TransitionComponent={Transition}>
            <DialogTitle>{'Alert'}</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to delete this task?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onConfirmButtonClick()} color="primary">
                    Yes, I am sure
                </Button>
                <Button onClick={handleDeleteTaskFormToggle} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
