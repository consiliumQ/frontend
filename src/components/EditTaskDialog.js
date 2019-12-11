import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, TextField, FormGroup, Button, MenuItem, makeStyles } from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { queries } from '../graphql';
import Transition from './common/TransitionEffect';

const useStyles = makeStyles(theme => ({
    editTaskModal: {
        minWidth: theme.modalWidth,
    },
    formGroupRow: {
        justifyContent: 'space-around',
    },
}));

const EMPTY_DETAIL_TASK = { title: '', description: '', backlog: '', priority: '', storyPoints: '' };

export default function EditTaskDialog({ taskId, shouldEditTaskFormOpen, handleEditTaskFormToggle }) {
    const classes = useStyles();
    const { data: backlogData } = useQuery(queries.GET_BACKLOG_TYPES);
    const { data: taskDetail } = useQuery(queries.GET_TASK_DETAIL, { variables: { taskId }, pollInterval: 2000 });
    const [updateTaskMutation] = useMutation(queries.MUTATE_UPDATE_TASK_DETAIL);
    const [backlogs, setFetchedBacklogs] = useState([]);
    const [updateTaskData, setUpdateTaskData] = useState({ ...EMPTY_DETAIL_TASK });

    useEffect(() => {
        if (taskDetail && taskDetail.task) {
            const {
                task: { __typename, ...task },
            } = taskDetail;
            setUpdateTaskData({ ...task });
        }
    }, [taskDetail, shouldEditTaskFormOpen]); // shouldEditTaskFormOpen will handle the reset of form

    useEffect(() => {
        if (backlogData) {
            const { __type: enumValues } = backlogData;
            setFetchedBacklogs(enumValues.enumValues.map(enumVal => enumVal.name));
        }
    }, [backlogData]);

    const onEditTaskFormSubmit = e => {
        e.preventDefault();

        updateTaskMutation({ variables: { taskId, updateTaskObj: updateTaskData } });

        handleEditTaskFormToggle();
    };

    return (
        <Dialog open={shouldEditTaskFormOpen} TransitionComponent={Transition} onClose={handleEditTaskFormToggle}>
            <DialogTitle>{'Edit Task'}</DialogTitle>
            <DialogContent className={classes.editTaskModal}>
                <form id={'edit-task-form'} onSubmit={e => onEditTaskFormSubmit(e)}>
                    <FormGroup>
                        <TextField
                            required
                            id={'title'}
                            name={'title'}
                            value={updateTaskData.title}
                            onChange={e => setUpdateTaskData({ ...updateTaskData, [e.target.name]: e.target.value })}
                            label={'Title'}
                            margin="normal"
                            variant="outlined"
                        />

                        <TextField
                            id={'description'}
                            name={'description'}
                            value={updateTaskData.description}
                            onChange={e => setUpdateTaskData({ ...updateTaskData, [e.target.name]: e.target.value })}
                            label="Description"
                            margin="normal"
                            variant="outlined"
                            rows={2}
                            rowsMax={2}
                            multiline
                            fullWidth
                        />

                        <TextField
                            id={'backlog'}
                            name={'backlog'}
                            value={updateTaskData.backlog || ''}
                            onChange={e => setUpdateTaskData({ ...updateTaskData, [e.target.name]: e.target.value })}
                            label="Select Backlog"
                            helperText="Please select the backlog for this task"
                            margin="normal"
                            variant="outlined"
                            select
                        >
                            {backlogs.map(option => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                        <FormGroup classes={{ row: classes.formGroupRow }} row>
                            <TextField
                                id={'priority'}
                                name={'priority'}
                                value={updateTaskData.priority || ''}
                                onChange={e => setUpdateTaskData({ ...updateTaskData, [e.target.name]: parseInt(e.target.value, 10) })}
                                label="Priority"
                                type="number"
                                margin="normal"
                            />
                            <TextField
                                id={'storyPoints'}
                                name={'storyPoints'}
                                value={updateTaskData.storyPoints || ''}
                                onChange={e => setUpdateTaskData({ ...updateTaskData, [e.target.name]: parseInt(e.target.value, 10) })}
                                label="Story Points"
                                type="number"
                                margin="normal"
                            />
                        </FormGroup>
                    </FormGroup>
                </form>
            </DialogContent>
            <DialogActions>
                <Button type={'submit'} form={'edit-task-form'} color="primary">
                    Submit
                </Button>
                <Button onClick={handleEditTaskFormToggle} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
