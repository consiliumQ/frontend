import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, FormGroup, TextField, DialogActions, Button} from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { queries } from '../graphql'
import Transition from './common/TransitionEffect';

const EMPTY_PROJECT_DATA = { name: '', description: ''};

export default function AddProjectDialog({ shouldAddProjectDialogOpen, toggleAddProjectDialog }) {
    const [newProjectData, setNewProjectData] = useState({ ...EMPTY_PROJECT_DATA });
    const [currentUserId, setCurrentUserId] = useState('');
    const [addProjectMutation] = useMutation(queries.MUTATE_ADD_PROJECT);
    const [addProjectToCacheMutation] = useMutation(queries.MUTATE_ADD_PROJECT_TO_CACHE);
    const { data: userData, loading: userLoading } = useQuery(queries.GET_USER_INFO);

    useEffect(() => {
       if (!userLoading) {
           const { user: { _id } } = userData;
           setCurrentUserId(_id);
       }
    }, [userData])

    const ownerId = currentUserId;

    const onAddProjectFormSubmit = e => {
        e.preventDefault();
        addProjectMutation({ variables: { ...newProjectData, ownerId }});
        addProjectToCacheMutation({ variables: { ...newProjectData, ownerId }});
        setNewProjectData({ ...EMPTY_PROJECT_DATA });
        toggleAddProjectDialog();
    }

    return (
        <Dialog open={shouldAddProjectDialogOpen} onClose={toggleAddProjectDialog} TransitionComponent={Transition}>
            <DialogTitle>{'Add New Project'}</DialogTitle>
            <DialogContent>
                <form id={'add-project-form'} onSubmit={e => onAddProjectFormSubmit(e)}>
                    <FormGroup>
                    <TextField
                            required
                            id={'name'}
                            name={'name'}
                            label={'Name'}
                            margin="normal"
                            variant="outlined"
                            value={newProjectData.name}
                            onChange={e => setNewProjectData({ ... newProjectData, [e.target.name]: e.target.value})}
                        />

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
                            value={newProjectData.description}
                            onChange={e => setNewProjectData({ ...newProjectData, [e.target.name]: e.target.value })}
                        />
                    </FormGroup>
                </form>
            </DialogContent>
            <DialogActions>
            <Button type={'submit'} form={'add-project-form'} color="primary">
                    Submit
                </Button>
                <Button onClick={toggleAddProjectDialog} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

