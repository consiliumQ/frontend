import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardActions,
    IconButton,
    Slide,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    Button,
    MenuItem,
    makeStyles,
} from '@material-ui/core';
import { EditOutlined, MoreVertOutlined } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: (theme.projectColumnWidth - 10) / 2,
        backgroundColor: theme.palette.secondary.main,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        boxShadow: 'none',
        color: theme.palette.primary.contrastText,
        '&:hover': {
            boxShadow: theme.shadows[10],
        },
        '& h3': {
            margin: 0,
        },
        '& p': {
            margin: 0,
            marginTop: 6,
        },
    },
    cardContent: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    iconPosition: {
        justifyContent: 'flex-end',
    },
    icon: {
        color: theme.palette.primary.contrastText,
    },
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function TaskCard({ task }) {
    const classes = useStyles();
    const [shouldEditTaskFormOpen, setEditTaskFormOpen] = useState(false);
    const [shouldDeleteTaskAlertOpen, setDeleteTaskFormOpen] = useState(false);
    const [backlog, setBacklog] = useState('project');

    const handleBacklogSelect = event => {
        setBacklog(event.target.value);
    };

    const handleEditTaskOpen = () => setEditTaskFormOpen(true);

    const handleEditTaskClose = () => setEditTaskFormOpen(false);

    const handleDeleteTaskOpen = () => setDeleteTaskFormOpen(true);

    const handleDeleteTaskClose = () => setDeleteTaskFormOpen(false);

    return (
        <>
            <Card className={classes.cardContainer}>
                <CardContent className={classes.cardContent}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                </CardContent>
                <CardActions classes={{ root: classes.iconPosition }}>
                    <IconButton size={'small'} onClick={handleEditTaskOpen}>
                        <EditOutlined className={classes.icon} />
                    </IconButton>
                    <IconButton size={'small'} onClick={handleDeleteTaskOpen}>
                        <DeleteIcon className={classes.icon} />
                    </IconButton>
                </CardActions>
            </Card>
            <Dialog open={shouldEditTaskFormOpen} TransitionComponent={Transition} keepMounted onClose={handleEditTaskClose}>
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
                            onChange={handleBacklogSelect}
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
                    <Button onClick={handleEditTaskClose} color="primary">
                        Submit
                    </Button>
                    <Button onClick={handleEditTaskClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={shouldDeleteTaskAlertOpen} onClose={handleDeleteTaskClose}>
                <DialogTitle>{'Alert'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this task?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteTaskClose} color="primary">
                        Yes, I am sure
                    </Button>
                    <Button onClick={handleDeleteTaskClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
