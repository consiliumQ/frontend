import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardActions, IconButton, ListItem, makeStyles } from '@material-ui/core';
import { EditOutlined, MoreVertOutlined } from '@material-ui/icons';
import { tasks } from '../../assets/DummyData';

const useStyles = makeStyles(theme => ({
    cardContainer: {
        width: '100%',
        maxHeight: 206.25,
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
    iconPosition: {
        justifyContent: 'flex-end',
    },
    icon: {
        color: theme.palette.primary.contrastText,
    },
}));

export default function TaskCard(props) {
    const classes = useStyles();
    const task = tasks.find(tsk => tsk.id === props.taskId);

    return (
        <ListItem>
            <Card className={classes.cardContainer}>
                <CardContent>
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
};
