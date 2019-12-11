import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemIcon, makeStyles } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { useQuery } from '@apollo/react-hooks';
import { queries } from '../graphql';
import Transition from './common/TransitionEffect';

const useStyles = makeStyles(theme => ({
    projectSelectorModal: {
        padding: 0,
    },
    projectSelectButton: {
        display: 'flex',
        padding: theme.spacing(1),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        color: theme.palette.primary.main,
    },
}));

export default function ProjectSelectorDialog({ dndOperation, shouldProjectSelectorOpen, toggleProjectSelector }) {
    const classes = useStyles();
    const [userProjects, setUserProjects] = useState({ allProjects: [], currProject: { id: null, name: '' } });
    const { data: userData, loading: userLoading } = useQuery(queries.GET_USER_INFO);
    const { data: currProjectData, loading: currProjectLoading } = useQuery(queries.GET_PROJECT_INFO_FROM_CACHE);
    const { refetch } = dndOperation;

    useEffect(() => {
        if (!userLoading && !currProjectLoading) {
            const {
                user: { projects },
            } = userData;
            const {
                project: { _id: currProjectId, name: currProjectName },
            } = currProjectData;

            setUserProjects({
                allProjects: projects.map(({ _id: projectId, name: projectName }) => ({
                    projectId,
                    projectName,
                })),
                currProject: { id: currProjectId, name: currProjectName },
            });
        }
    }, [userData, currProjectData]);

    useEffect(() => {
        const { currProject } = userProjects;
        if (currProject.id) {
            refetch({ projectId: currProject.id });
        }
    }, [userProjects]);

    const onProjectSelect = (projectId, projectName) => {
        setUserProjects({ ...userProjects, currProject: { id: projectId, name: projectName } });
        toggleProjectSelector();
    };

    return (
        <Dialog open={shouldProjectSelectorOpen} onClose={toggleProjectSelector} TransitionComponent={Transition} maxWidth={'xs'} fullWidth>
            <DialogTitle className={classes.dialogTitle}>{'Select a project'}</DialogTitle>
            <DialogContent className={classes.projectSelectorModal}>
                <List>
                    {userProjects.allProjects.map(({ projectId, projectName }) => (
                        <ListItem
                            key={projectId}
                            button
                            onClick={() => onProjectSelect(projectId, projectName)}
                            className={classes.projectSelectButton}
                        >
                            {projectName}
                            {userProjects.currProject.id === projectId && (
                                <ListItemIcon>
                                    <Check className={classes.icon} />
                                </ListItemIcon>
                            )}
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
}
