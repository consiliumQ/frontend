import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, makeStyles } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { queries } from '../graphql';
import Transition from './common/TransitionEffect';

const useStyles = makeStyles(theme => ({
    addColumnModalContent: {
        minWidth: theme.modalWidth,
    },
    textField: {},
}));

const EMPTY_COLUMN_DATA = { name: '', description: '' };

export default function AddColumnDialog({ shouldAddColumnFormOpen, handleAddColumnToggle }) {
    const classes = useStyles();
    const [newColumnData, setNewColumnData] = useState({ ...EMPTY_COLUMN_DATA });
    const [addColumnMutation, { client }] = useMutation(queries.MUTATE_ADD_COLUMN);

    const onAddColumnFormSubmit = e => {
        e.preventDefault();

        const {
            project: { _id: projectId },
        } = client.readQuery({ query: queries.GET_PROJECT_INFO_FROM_CACHE });
        addColumnMutation({ variables: { ...newColumnData, projectId } });

        setNewColumnData({ ...EMPTY_COLUMN_DATA });
        handleAddColumnToggle();
    };

    return (
        <Dialog open={shouldAddColumnFormOpen} TransitionComponent={Transition} onClose={() => handleAddColumnToggle()}>
            <DialogTitle>{'Create New Column'}</DialogTitle>
            <DialogContent className={classes.addColumnModalContent}>
                <form id={'add-new-column-form'} onSubmit={e => onAddColumnFormSubmit(e)}>
                    <div>
                        <TextField
                            required
                            id={'name'}
                            name={'name'}
                            label={'Column Name'}
                            value={newColumnData.name}
                            onChange={e => setNewColumnData({ ...newColumnData, [e.target.name]: e.target.value })}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <TextField
                            id={'description'}
                            name={'description'}
                            value={newColumnData.description}
                            onChange={e => setNewColumnData({ ...newColumnData, [e.target.name]: e.target.value })}
                            label="Description"
                            placeholder="Write a short description"
                            margin="normal"
                            variant="outlined"
                            rows={2}
                            rowsMax={2}
                            multiline
                            fullWidth
                        />
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
                <Button form={'add-new-column-form'} type={'submit'} color="primary">
                    Submit
                </Button>
                <Button onClick={() => handleAddColumnToggle()} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
