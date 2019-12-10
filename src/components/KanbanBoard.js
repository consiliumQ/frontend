import React, { useState } from 'react';
import { Button, makeStyles, Toolbar } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useDndOperation, useBoardHeight } from '../hooks';
import { DnDColumn, CustomDragLayer, AddColumnDialog, AddTaskDialog } from '.';

const useStyles = makeStyles(theme => ({
    horizontalColumnList: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'nowrap',
        flexGrow: 1,
        overflow: 'auto',
    },
    addColumnButton: {
        height: theme.spacing(10),
        border: `2px dashed ${theme.palette.primary.light}`,
        backgroundColor: theme.palette.primary.dark,
        borderRadius: theme.spacing(1),
        color: theme.palette.primary.contrastText,
        flexGrow: 1,
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            border: 0,
        },
    },
    buttonColumn: {
        minWidth: theme.projectColumnWidth,
        padding: 5,
        borderLeft: `1px solid ${theme.palette.primary.light}`,
        borderRight: `1px solid ${theme.palette.primary.light}`,
        display: 'flex',
    },
    addColumnModalContent: {
        minWidth: theme.modalWidth,
    },
    paper: {},
    projectToolBar: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        borderBottom: `1px solid ${theme.palette.primary.light}`,
    },
}));

function KanbanBoard() {
    const classes = useStyles();
    const boardHeight = useBoardHeight();
    const [columnsState, dndOperation] = useDndOperation();
    const [shouldAddColumnFormOpen, setAddColumnFormOpen] = useState(false);
    const [shouldAddTaskDialogOpen, setAddTaskDialogOpen] = useState(false);

    const { ColumnsState } = dndOperation;

    const ProjectToolBar = () => (
        <Toolbar variant={'dense'} className={classes.projectToolBar} disableGutters>
            <Button startIcon={<Add />} variant={'contained'} onClick={() => setAddTaskDialogOpen(!shouldAddTaskDialogOpen)}>
                {'Add new Task'}
            </Button>
        </Toolbar>
    );

    return (
        <>
            <ProjectToolBar />
            <div className={classes.horizontalColumnList} style={{ height: boardHeight }}>
                {columnsState.map((column, columnIdx) => (
                    <ColumnsState.Provider key={column._id} value={columnsState}>
                        <DnDColumn
                            isLastColumn={columnIdx === columnsState.length - 1}
                            column={column}
                            columnIdx={columnIdx}
                            dndOperation={dndOperation}
                        />
                    </ColumnsState.Provider>
                ))}
                <div className={classes.buttonColumn}>
                    <Button
                        startIcon={<Add />}
                        variant={'contained'}
                        onClick={() => setAddColumnFormOpen(!shouldAddColumnFormOpen)}
                        className={classes.addColumnButton}
                    >
                        {'Add Column'}
                    </Button>
                </div>
            </div>
            <AddColumnDialog
                shouldAddColumnFormOpen={shouldAddColumnFormOpen}
                handleAddColumnToggle={() => setAddColumnFormOpen(!shouldAddColumnFormOpen)}
            />
            <AddTaskDialog
                shouldAddTaskDialogOpen={shouldAddTaskDialogOpen}
                toggleAddTaskDialog={() => setAddTaskDialogOpen(!shouldAddTaskDialogOpen)}
            />
            <CustomDragLayer columnsState={columnsState} />
        </>
    );
}

export default KanbanBoard;
