import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, IconButton, Container, Grid, Divider, makeStyles } from '@material-ui/core';
import { EditOutlined, MoreVertOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    cardContainer: {
        width: 275,
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
    return (
        <Card className={classes.cardContainer}>
            <CardContent>
                <h3>{`Title ${props.task}`}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
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
    );
}
