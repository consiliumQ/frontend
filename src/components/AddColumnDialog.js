import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, makeStyles } from '@material-ui/core';
import Transition from './common/TransitionEffect';

const useStyles = makeStyles(theme => ({
    addColumnModalContent: {
        minWidth: theme.modalWidth,
    },
    textField: {},
}));

export default function AddColumnDialog({ shouldAddColumnFormOpen, handleAddColumnToggle }) {
    const classes = useStyles();
    return (
        <Dialog open={shouldAddColumnFormOpen} TransitionComponent={Transition} onClose={() => handleAddColumnToggle()}>
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
                <Button onClick={() => handleAddColumnToggle()} color="primary">
                    Submit
                </Button>
                <Button onClick={() => handleAddColumnToggle()} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
