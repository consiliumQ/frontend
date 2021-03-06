import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, List, ListSubheader, IconButton } from '@material-ui/core';
import { Add, Delete, EditOutlined } from '@material-ui/icons';
import { DnDTaskCard, TaskCard, AddTaskDialog } from '.';
import EditColumnDialog from './EditColumnDialog';

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
        display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'center',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    columnFooterToolBar: {
        backgroundColor: theme.palette.primary.main,
    },
    addTaskCardButton: {
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            border: 0,
        },
    },
    icon: {
        color: theme.palette.primary.contrastText,
    },
}));

export default function KanbanColumn({ isLastColumn, column, dndOperation, isPreview }) {
    const { tasks } = column;
    const classes = useStyles({ isLastColumn });
    const [shouldAddTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
    // const [shouldDeleteColumnDialogOpen, setDeleteColumnDialogOpen] = useState(false);
    const [shouldEditColumnDialogOpen, setEditColumnDialogOpen] = useState(false);

    const ColumnHeader = () => (
        <ListSubheader className={classes.columnHeader} disableGutters>
            <h2>{column.name}</h2>
            <IconButton
                title={'add a new task to column'}
                size={'small'}
                variant={'contained'}
                onClick={() => setAddTaskDialogOpen(!shouldAddTaskDialogOpen)}
                className={classes.addTaskCardButton}
            >
                <Add className={classes.icon} />
            </IconButton>
            <IconButton
                title={'edit this column'}
                size={'small'}
                variant={'contained'}
                onClick={() => setEditColumnDialogOpen(!shouldEditColumnDialogOpen)}
                className={classes.addTaskCardButton}
            >
                <EditOutlined className={classes.icon} />
            </IconButton>
            {/* <IconButton
                title={'remove this column'}
                size={'small'}
                variant={'contained'}
                onClick={() => setDeleteColumnDialogOpen(!shouldDeleteColumnDialogOpen)}
                className={classes.addTaskCardButton}
            >
                <Delete className={classes.icon} />
            </IconButton> */}
        </ListSubheader>
    );

    return (
        <>
            <div className={classes.kanbanColumn}>
                <List subheader={<ColumnHeader />} className={classes.tasksContainer}>
                    {tasks.map((task, taskIdx) =>
                        isPreview ? (
                            <TaskCard key={`${task._id}-preview`} task={task} />
                        ) : (
                            <DnDTaskCard key={task._id} task={task} taskIdx={taskIdx} dndOperation={dndOperation} />
                        ),
                    )}
                </List>
            </div>
            <AddTaskDialog
                columnId={column._id}
                shouldAddTaskDialogOpen={shouldAddTaskDialogOpen}
                toggleAddTaskDialog={() => setAddTaskDialogOpen(!shouldAddTaskDialogOpen)}
            />
            <EditColumnDialog
                columnId={column._id}
                shouldEditColumnDialogOpen={shouldEditColumnDialogOpen}
                toggleEditColumnDialog={() => setEditColumnDialogOpen(!shouldEditColumnDialogOpen)}
            />
            {/* <DeleteColumnAlertDialog
                columnId={column._id}
                shouldDeleteColumnDialogOpen={shouldDeleteColumnDialogOpen}
                handleDeleteColumnDialogToggle={() => setDeleteColumnDialogOpen(!shouldDeleteColumnDialogOpen)}
            /> */}
        </>
    );
}

KanbanColumn.defaultProps = {
    isLastColumn: false,
    isPreview: false,
};

KanbanColumn.propTypes = {
    isLastColumn: PropTypes.bool,
    isPreview: PropTypes.bool,
};
