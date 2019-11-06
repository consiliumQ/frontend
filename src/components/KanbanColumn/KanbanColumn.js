import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, List, ListSubheader } from '@material-ui/core';
import { TaskCard } from '..';
import { columns } from '../../assets/DummyData';

const useStyles = makeStyles(theme => ({
    kanbanColumn: {
        borderLeft: `1px solid ${theme.palette.primary.light}`,
        borderRight: props => (props.isLastColumn ? `1px solid ${theme.palette.primary.light}` : 0),
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

export default function KanbanColumn({ isLastColumn, columnId }) {
    const classes = useStyles({ isLastColumn });
    const column = columns.find(col => col.id === columnId);

    const ColumnHeader = () => (
        <ListSubheader className={classes.columnHeader} disableGutters>
            <h2>{column.name}</h2>
        </ListSubheader>
    );

    return (
        <div className={classes.kanbanColumn}>
            <List subheader={<ColumnHeader />} className={classes.tasksContainer}>
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
