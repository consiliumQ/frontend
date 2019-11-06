import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, List } from '@material-ui/core';
import { TaskCard } from '..';
import { columns } from '../../assets/DummyData';

const useStyles = makeStyles(theme => ({
    kanbanColumn: {
        borderLeft: `1px solid ${theme.palette.primary.light}`,
        borderRight: props => (props.isLastColumn ? `1px solid ${theme.palette.primary.light}` : 0),
        minWidth: theme.projectColumnWidth,
        overflow: 'auto',
        '& h2': {
            width: '100%',
            color: theme.palette.primary.contrastText,
            textAlign: 'center',
        },
    },
    tasksContainer: {
        paddingLeft: 5,
        paddingRight: 5,
        '& li': {
            padding: 0,
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
}));

export default function KanbanColumn({ isLastColumn, columnId }) {
    const classes = useStyles({ isLastColumn });
    const column = columns.find(col => col.id === columnId);

    return (
        <div className={classes.kanbanColumn}>
            <h2>{column.name}</h2>
            <List className={classes.tasksContainer}>
                {column.taskList.map(taskId => (
                    <TaskCard key={taskId} taskId={taskId} />
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
    columnId: PropTypes.string.isRequired,
};
