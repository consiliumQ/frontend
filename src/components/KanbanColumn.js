import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { makeStyles, List, ListSubheader } from '@material-ui/core';
import * as itemTypes from '../dnd/dndItemTypes';
import { TaskCard } from '.';

const useStyles = makeStyles(theme => ({
    kanbanColumn: {
        borderLeft: `1px solid ${theme.palette.primary.light}`,
        minWidth: theme.projectColumnWidth,
        overflow: 'auto',
    },
    tasksContainer: {
        paddingLeft: 5,
        paddingRight: 5,
        '& li': {
            padding: 0,
            justifyContent: 'center',
            alignItems: 'center',
            '& h2': {
                margin: 0,
                width: '100%',
                color: theme.palette.primary.contrastText,
            },
        },
    },
    columnHeader: {
        textAlign: 'center',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
}));

export default function KanbanColumn({ isLastColumn, column }) {
    const { tasks } = column;
    const classes = useStyles({ isLastColumn });

    const ColumnHeader = () => (
        <ListSubheader className={classes.columnHeader} disableGutters>
            <h2>{column.name}</h2>
        </ListSubheader>
    );

    return (
        <div className={classes.kanbanColumn}>
            <List subheader={<ColumnHeader />} className={classes.tasksContainer}>
                {tasks.map((task, index) => (
                    <TaskCard key={task._id} task={task} currIndex={index} />
                ))}
            </List>
        </div>
    );
}

KanbanColumn.defaultProps = {
    isLastColumn: false,
};

KanbanColumn.propTypes = {
    isLastColumn: PropTypes.bool,
};
