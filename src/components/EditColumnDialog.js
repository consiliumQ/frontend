import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, FormGroup, TextField, DialogActions, Button } from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { queries } from '../graphql';
import Transition from './common/TransitionEffect';

const EMPTY_DETAIL_COLUMN = { name: '', description: '' };

export default function EditColumnDialog({ columnId, shouldEditColumnDialogOpen, toggleEditColumnDialog }) {
    const { data: columnDetail } = useQuery(queries.GET_COLUMN_DETAIL, { variables: { columnId }, pollInterval: 2000 });
    const [updateColumnMutation] = useMutation(queries.MUTATE_UPDATE_ONE_COLUMN);
    const [updateColumnData, setUpdateColumnData] = useState({ ...EMPTY_DETAIL_COLUMN });

    useEffect(() => {
        if (columnDetail && columnDetail.column) {
            const {
                column: { __typename, ...column },
            } = columnDetail;
            setUpdateColumnData({ ...column });
        }
    }, [columnDetail, shouldEditColumnDialogOpen]);

    const onEditColumnFormSubmit = e => {
        e.preventDefault();
        updateColumnMutation({ variables: { columnId, updateColumnObj: updateColumnData } });
        toggleEditColumnDialog();
    };
    return (
        <Dialog open={shouldEditColumnDialogOpen} onClose={toggleEditColumnDialog} TransitionComponent={Transition}>
            <DialogTitle>{'Edit Column'}</DialogTitle>
            <DialogContent>
                <form id={'edit-column-form'} onSubmit={e => onEditColumnFormSubmit(e)}>
                    <FormGroup>
                        <TextField
                            required
                            id={'name'}
                            name={'name'}
                            value={updateColumnData.name}
                            onChange={e => setUpdateColumnData({ ...updateColumnData, [e.target.name]: e.target.value })}
                            label={'Name'}
                            margin="normal"
                            variant="outlined"
                        />

                        <TextField
                            id={'description'}
                            name={'description'}
                            value={updateColumnData.description}
                            onChange={e => setUpdateColumnData({ ...updateColumnData, [e.target.name]: e.target.value })}
                            label="Description"
                            margin="normal"
                            variant="outlined"
                            rows={2}
                            rowsMax={2}
                            multiline
                            fullWidth
                        />
                    </FormGroup>
                </form>
            </DialogContent>
            <DialogActions>
                <Button type={'submit'} form={'edit-column-form'} color="primary">
                    Submit
                </Button>
                <Button onClick={toggleEditColumnDialog} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
