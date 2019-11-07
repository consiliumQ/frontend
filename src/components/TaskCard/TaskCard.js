import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { Card, CardContent, CardActions, IconButton, ListItem, makeStyles } from '@material-ui/core';
import { EditOutlined, MoreVertOutlined } from '@material-ui/icons';
import * as itemTypes from '../../dnd/dndItemTypes';
import { tasks } from '../../assets/DummyData';

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
}));

export default function TaskCard({ taskId, currIndex }) {
    const task = tasks.find(tsk => tsk.id === taskId);

    const classes = useStyles();
    const taskCardRef = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        item: { type: itemTypes.DND_TASK_CARD, taskId, index: currIndex },
        end: item => {
            console.log('End drag', item);
        },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

    const [, drop] = useDrop({
        accept: itemTypes.DND_TASK_CARD,
        hover: () => {},
        drop: item => {
            console.log('Drop ', item);
        },
    });

    drag(drop(taskCardRef));

    return (
        <ListItem ref={taskCardRef} style={{ opacity: isDragging ? 0.3 : 1 }}>
            <Card className={classes.cardContainer}>
                <CardContent className={classes.cardContent}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                </CardContent>
                <CardActions classes={{ root: classes.iconPosition }}>
                    <IconButton size={'small'} onClick={() => console.log('icon button clicked!')}>
                        <EditOutlined className={classes.icon} />
                    </IconButton>
                    <IconButton size={'small'} onClick={() => console.log('icon button click')}>
                        <MoreVertOutlined className={classes.icon} />
                    </IconButton>
                </CardActions>
            </Card>
        </ListItem>
    );
}

TaskCard.propTypes = {
    taskId: PropTypes.string.isRequired,
    currIndex: PropTypes.number.isRequired,
};
