import React, { useState } from 'react';
import { Card, CardContent, CardActions, IconButton, makeStyles } from '@material-ui/core';
import { EditOutlined, Delete } from '@material-ui/icons';
import { EditTaskDialog, DeleteTaskAlertDialog } from '.';

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

export default function TaskCard({ task }) {
    const classes = useStyles();
    const [shouldEditTaskFormOpen, setEditTaskFormOpen] = useState(false);
    const [shouldDeleteTaskAlertOpen, setDeleteTaskFormOpen] = useState(false);

    return (
        <>
            <Card className={classes.cardContainer}>
                <CardContent className={classes.cardContent}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                </CardContent>
                <CardActions classes={{ root: classes.iconPosition }}>
                    <IconButton size={'small'} onClick={() => setEditTaskFormOpen(!shouldEditTaskFormOpen)}>
                        <EditOutlined className={classes.icon} />
                    </IconButton>
                    <IconButton size={'small'} onClick={() => setDeleteTaskFormOpen(!shouldDeleteTaskAlertOpen)}>
                        <Delete className={classes.icon} />
                    </IconButton>
                </CardActions>
            </Card>
            <EditTaskDialog
                task={task}
                shouldEditTaskFormOpen={shouldEditTaskFormOpen}
                handleEditTaskFormToggle={() => setEditTaskFormOpen(!shouldEditTaskFormOpen)}
            />
            <DeleteTaskAlertDialog
                shouldDeleteTaskAlertOpen={shouldDeleteTaskAlertOpen}
                handleDeleteTaskFormToggle={() => setDeleteTaskFormOpen(!shouldDeleteTaskAlertOpen)}
            />
        </>
    );
}
