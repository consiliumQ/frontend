import React from 'react';
import { Dialog, DialogTitle, DialogContent, FormGroup, TextField, DialogActions, Button } from '@material-ui/core';

export default function EditColumnDialog({ columnId, shouldEditColumnDialogOpen, toggleEditColumnDialog }) {
    return (
        <Dialog open={shouldEditColumnDialogOpen} onClose={toggleEditColumnDialog}>
            <DialogTitle>{'Edit Column'}</DialogTitle>
            <DialogContent>
                <form>
                    <FormGroup>
                        <TextField required id={'title'} name={'title'} label={'Title'} margin="normal" variant="outlined" />

                        <TextField
                            id={'description'}
                            name={'description'}
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
                <Button type={'submit'} form={'edit-task-form'} color="primary">
                    Submit
                </Button>
                <Button onClick={toggleEditColumnDialog} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
