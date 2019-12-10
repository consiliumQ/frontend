import React, { useState } from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, TextField, Button, MenuItem, makeStyles } from '@material-ui/core';
import Transition from './common/TransitionEffect';

const useStyles = makeStyles(theme => ({
    editTaskModal: {
        minWidth: theme.modalWidth,
    },
}));

// This is temp values for backlog (before getting backlog from backend)
const backlogs = [
    {
        value: 'project',
        label: 'project',
    },
    {
        value: 'release',
        label: 'release',
    },
    {
        value: 'sprint',
        label: 'sprint',
    },
];

export default function EditTaskDialog({ task, shouldEditTaskFormOpen, handleEditTaskFormToggle }) {
    const classes = useStyles();
    const [backlog, setBacklog] = useState('project');

    return (
        <Dialog open={shouldEditTaskFormOpen} TransitionComponent={Transition} onClose={handleEditTaskFormToggle}>
            <DialogTitle>{'Edit Task'}</DialogTitle>
            <DialogContent className={classes.editTaskModal}>
                <div>
                    <TextField required id="outlined-required" label="Required" defaultValue={task.title} margin="normal" variant="outlined" />
                </div>
                <div>
                    <TextField
                        id="outlined-full-width"
                        label="Description"
                        placeholder={task.description}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Select Backlog"
                        helperText="Please select the backlog for this task"
                        value={backlog}
                        onChange={e => setBacklog(e.target.value)}
                        margin="normal"
                        variant="outlined"
                    >
                        {backlogs.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div>
                    <TextField
                        id="standard-number"
                        label="Priority"
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        style={{ paddingRight: '2rem' }}
                    />
                    <TextField
                        id="standard-number"
                        label="Story Points"
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditTaskFormToggle} color="primary">
                    Submit
                </Button>
                <Button onClick={handleEditTaskFormToggle} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
