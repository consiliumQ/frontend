import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useDndOperation, useBoardHeight } from '../hooks';
import { DnDColumn, CustomDragLayer } from '.';

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
}));

function KanbanBoard() {
    // TODO: receive data from GraphQL server

    const classes = useStyles();
    const boardHeight = useBoardHeight();
    const [columnsState, dndOperation] = useDndOperation();

    return (
        <>
            <div className={classes.horizontalColumnList} style={{ height: boardHeight }}>
                {columnsState.map((column, index) => (
                    <DnDColumn key={column._id} isLastColumn={index === columnsState.length - 1} column={column} dndOperation={dndOperation} />
                ))}
                <div className={classes.buttonColumn}>
                    <Button
                        startIcon={<Add />}
                        variant={'contained'}
                        onClick={() => console.log('Add Column Button Click!')}
                        className={classes.addColumnButton}
                    >
                        {'Add Column'}
                    </Button>
                </div>
            </div>
            <CustomDragLayer columnsState={columnsState} />
        </>
    );
}

export default KanbanBoard;
