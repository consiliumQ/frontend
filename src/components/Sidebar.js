import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Avatar, Grid, Chip } from '@material-ui/core';
import TimelineIcon from '@material-ui/icons/Timeline';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { useQuery } from '@apollo/react-hooks';
import { queries } from '../graphql';
import DashboardIcon from '@material-ui/icons/Dashboard';

import mijeong from '../assets/images/mj.png';

const useStyles = makeStyles(theme => ({
    list: {
        width: 300,
        backgroundColor: theme.palette.primary.main,
        flexGrow: 1,
    },
    bigAvatar: {
        margin: 10,
        width: 120,
        height: 120,
    },
    chip: {
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.primary.contrastText,
        color: theme.palette.primary.light,
        fontSize: '130%',
    },
    listItem: {
        color: theme.palette.primary.contrastText,
        fontSize: '110%',
    },
    divider: {
        backgroundColor: theme.palette.primary.light,
    },
}));

// Divide case into Loggedin, !Loggedin
// Loggedin -> Actual Profile
// !Loggedin -> Login/Signup button
export default function SideBar({ dndOperation, shouldSideBarOpen, toggleSideBar }) {
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

    return (
        <Drawer className={classes.drawer} open={shouldSideBarOpen} onClose={toggleSideBar}>
            <div className={classes.list} role={'presentation'}>
                <Grid container justify={'center'} alignItems={'center'}>
                    <Avatar alt={'prettymj'} src={mijeong} className={classes.bigAvatar} />
                </Grid>
                <Divider className={classes.divider} />
                <Grid container justify={'center'} alignItems={'center'}>
                    <Chip className={classes.chip} label={'Overview'} />
                </Grid>
                <List>
                    <ListItem button key="kanbanboard" className={classes.listItem} component={Link} to="/homepage" onClick={() => toggleSideBar()}>
                        <ListItemIcon className={classes.listItem}>{<DashboardIcon />}</ListItemIcon>
                        {'Kanban Board'}
                    </ListItem>
                    <ListItem button key="viz" className={classes.listItem}>
                        <ListItemIcon className={classes.listItem}>{<TimelineIcon />}</ListItemIcon>
                        {'Visualization'}
                    </ListItem>
                </List>
                <Divider className={classes.divider} />
                <Grid container justify={'center'} alignItems={'center'}>
                    <Chip className={classes.chip} label={'My Projects'} />
                </Grid>
                <List>
                    {/* <ListItem
                        key="goToDashboard"
                        className={classes.listItem}
                        button
                        component={Link}
                        to="/dashboard"
                        onClick={() => toggleSideBar()}
                    >
                        <ListItemIcon className={classes.listItem}>{<ExitToAppIcon />}</ListItemIcon>
                        {'Go To Dashboard'}
                    </ListItem> */}
                    {userProjects.allProjects.map(({ projectId, projectName }) => (
                        <ListItem key={projectId} className={classes.listItem}>
                            <ListItemIcon className={classes.listItem}>{<AppsOutlinedIcon />}</ListItemIcon>
                            {projectName}
                        </ListItem>
                    ))}
                </List>
                <Divider className={classes.divider} />
                <List>
                    {['Account Setting'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon className={classes.listItem}>{<SettingsOutlinedIcon />}</ListItemIcon>
                            <ListItemText className={classes.listItem} primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </Drawer>
    );
}
