import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, IconButton, Container, Grid, Divider, makeStyles, List, ListItem } from '@material-ui/core';
import { EditOutlined, MoreVertOutlined } from '@material-ui/icons';
import { TaskCard } from '..';

const useStyles = makeStyles(theme => ({
    kanbanColumn: {
        height: window.innerHeight - 150,
        borderLeftWidth: 1,
        borderLeftColor: theme.palette.primary.light,
        borderLeftStyle: 'solid',
        borderRightWidth: 1,
        borderRightColor: theme.palette.primary.light,
        borderRightStyle: 'solid',
        '& li': {
            padding: 0,
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
}));

export default function KanbanColumn(props) {
    const classes = useStyles();
    const TaskCardItems = () => (
        <>
            {props.tasks.map(task => (
                <ListItem key={task}>
                    <TaskCard task={task} />
                </ListItem>
            ))}
        </>
    );
    return (
        <List className={classes.kanbanColumn}>
            <TaskCardItems />
        </List>
    );
}
