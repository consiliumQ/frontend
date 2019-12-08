import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, List, ListSubheader } from '@material-ui/core';
import { DnDTaskCard } from '.';

const useStyles = makeStyles(theme => ({
    kanbanColumn: {
        borderLeft: `1px solid ${theme.palette.primary.light}`,
        minWidth: theme.projectColumnWidth,
        height: '100%',
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

export default function KanbanColumn({ isLastColumn, column, dndOperation }) {
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
                {tasks.map(task => (
                    <DnDTaskCard key={task._id} task={task} dndOperation={dndOperation} />
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
