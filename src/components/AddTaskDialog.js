import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, FormGroup, makeStyles } from '@material-ui/core';
import Transition from './common/TransitionEffect';

const useStyles = makeStyles(theme => ({
    addTaskModal: {
        minWidth: theme.modalWidth,
    },
}));

export default function AddTaskDialog({ shouldAddTaskDialogOpen, toggleAddTaskDialog }) {
    const classes = useStyles();
    const [newTaskData, setNewTaskData] = useState({ title: '', description: '' });

    const onAddTaskButtonClick = () => {
        console.log(newTaskData); // should call GraphQL mutation
        toggleAddTaskDialog();
    };

    return (
        <Dialog open={shouldAddTaskDialogOpen} onClose={toggleAddTaskDialog} TransitionComponent={Transition}>
            <DialogTitle className={classes.dialogTitle}>{'Add New Task'}</DialogTitle>
            <DialogContent className={classes.addTaskModal}>
                <FormGroup>
                    <TextField
                        id={'title'}
                        name={'title'}
                        type={'text'}
                        label={'Title'}
                        variant={'outlined'}
                        margin={'normal'}
                        value={newTaskData.title}
                        onChange={e => setNewTaskData({ ...newTaskData, [e.target.name]: e.target.value })}
                        color={'secondary'}
                        required
                    />
                    <TextField
                        id={'description'}
                        name={'description'}
                        type={'textarea'}
                        label={'Description'}
                        rows={3}
                        rowsMax={3}
                        variant={'outlined'}
                        margin={'normal'}
                        value={newTaskData.description}
                        onChange={e => setNewTaskData({ ...newTaskData, [e.target.name]: e.target.value })}
                        color={'secondary'}
                        fullWidth
                        multiline
                    />
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={onAddTaskButtonClick} color={'primary'}>
                    {'Add Task'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
