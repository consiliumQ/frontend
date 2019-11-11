import React, { useState, useEffect } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { KanbanColumn } from '..';
import { project } from '../../assets/DummyData';

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
        borderRight: `1px solid ${theme.palette.primary.light}`,
        display: 'flex',
    },
}));

// custom hook for changing the height of kanban board based on window.innerHeight
// this behavior mimics the Project feature of GitHub, but the performance is a little concerning
const useBoardHeight = () => {
    const [boardHeight, setBoardHeight] = useState(window.innerHeight - 85);

    const setBoardHeightOnListen = () => setBoardHeight(window.innerHeight - 85);
    useEffect(() => {
        window.addEventListener('resize', setBoardHeightOnListen);
        return () => {
            window.removeEventListener('resize', setBoardHeightOnListen);
        };
    });

    return boardHeight;
};

export default function KanbanBoard() {
    // TODO: receive data from GraphQL server
    const classes = useStyles();
    const boardHeight = useBoardHeight();

    return (
        <div className={classes.horizontalColumnList} style={{ height: boardHeight }}>
            {project.columns.map((columnId, index) => (
                <KanbanColumn isLastColumn={index === project.columns.length - 1} key={columnId} columnId={columnId} />
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
    );
}
