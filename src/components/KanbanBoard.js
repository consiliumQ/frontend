import React, { useState } from 'react';
import { Button, Slide, Dialog, DialogActions, DialogTitle, DialogContent, TextField, makeStyles } from '@material-ui/core';
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
    addColumnModalContent: {
        minWidth: theme.modalWidth,
    },
    paper: {},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function KanbanBoard() {
    // TODO: receive data from GraphQL server

    const classes = useStyles();
    const boardHeight = useBoardHeight();
    const [columnsState, dndOperation] = useDndOperation();
    const [open, setOpen] = useState(false);

    const handleAddColumnOpen = () => {
        setOpen(true);
    };

    const handleAddColumnClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className={classes.horizontalColumnList} style={{ height: boardHeight }}>
                {columnsState.map((column, index) => (
                    <DnDColumn key={column._id} isLastColumn={index === columnsState.length - 1} column={column} dndOperation={dndOperation} />
                ))}
                <div className={classes.buttonColumn}>
                    <Button startIcon={<Add />} variant={'contained'} onClick={handleAddColumnOpen} className={classes.addColumnButton}>
                        {'Add Column'}
                    </Button>
                </div>
            </div>
            <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleAddColumnClose}>
                <DialogTitle>{'Create New Column'}</DialogTitle>
                <DialogContent className={classes.addColumnModalContent}>
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            defaultValue="Title"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-full-width"
                            label="Description"
                            placeholder="Write a short description"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddColumnClose} color="primary">
                        Submit
                    </Button>
                    <Button onClick={handleAddColumnClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <CustomDragLayer columnsState={columnsState} />
        </>
    );
}

export default KanbanBoard;
