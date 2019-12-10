import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, FormGroup, makeStyles } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { queries } from '../graphql';
import Transition from './common/TransitionEffect';

const useStyles = makeStyles(theme => ({
    addTaskModal: {
        minWidth: theme.modalWidth,
    },
}));

const EMPTY_TASK_DATA = { title: '', description: '' };

export default function AddTaskDialog({ shouldAddTaskDialogOpen, toggleAddTaskDialog, columnId = null }) {
    const classes = useStyles();
    const [newTaskData, setNewTaskData] = useState({ ...EMPTY_TASK_DATA, columnId });
    const [addTaskMutation, { client }] = useMutation(queries.MUTATE_ADD_TASK);

    const onAddTaskFormSubmit = e => {
        e.preventDefault();

        const {
            project: { _id: projectId },
        } = client.readQuery({ query: queries.GET_PROJECT_ID_FROM_CACHE });
        addTaskMutation({ variables: { ...newTaskData, projectId } });

        setNewTaskData({ ...EMPTY_TASK_DATA, columnId });
        toggleAddTaskDialog();
    };

    return (
        <Dialog open={shouldAddTaskDialogOpen} onClose={toggleAddTaskDialog} TransitionComponent={Transition}>
            <DialogTitle className={classes.dialogTitle}>{'Add New Task'}</DialogTitle>
            <DialogContent className={classes.addTaskModal}>
                <form id={'add-new-task-form'} onSubmit={e => onAddTaskFormSubmit(e)}>
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
                </form>
            </DialogContent>
            <DialogActions>
                <Button form={'add-new-task-form'} type={'submit'} color={'primary'}>
                    {'Add Task'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
