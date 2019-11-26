import React, { useRef, useContext } from 'react';
import PropTypes, { any } from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { makeStyles, List, ListSubheader } from '@material-ui/core';
import * as itemTypes from '../dnd/dndItemTypes';
import { TaskCard } from '.';
import { columns } from '../assets/DummyData';
import { types, CardPosition } from '../tempDataContext';

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

export default function KanbanColumn({ isLastColumn, colSchema }) {
    const { id: columnId, tasks: taskList } = colSchema;
    const column = columns.find(col => col.id === columnId);

    const classes = useStyles({ isLastColumn });

    const kanbanColRef = useRef(null);
    const [, drop] = useDrop({
        accept: itemTypes.DND_TASK_CARD,
        drop: () => {},
    });

    drop(kanbanColRef);

    const ColumnHeader = () => (
        <ListSubheader className={classes.columnHeader} disableGutters>
            <h2>{column.name}</h2>
        </ListSubheader>
    );

    return (
        <div ref={kanbanColRef} className={classes.kanbanColumn}>
            <List subheader={<ColumnHeader />} className={classes.tasksContainer}>
                {taskList.map((taskId, index) => (
                    <TaskCard key={taskId} taskId={taskId} columnId={columnId} currIndex={index} />
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
