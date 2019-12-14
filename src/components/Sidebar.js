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
export default function SideBar({ shouldSideBarOpen, toggleSideBar }) {
    const classes = useStyles();
    const [currentUserId, setCurrentUserId] = useState('');
    const [userProjects, setUserProjects] = useState([]);
    const { data: userData, loading: userLoading } = useQuery(queries.GET_USER_INFO);

    useEffect(() => {
        if (!userLoading) {
           const { user: { _id } } = userData;
           setCurrentUserId(_id);
        }
    }, [userData]);

    const { data: projectData, loading: projectDataLoading } = useQuery(queries.GET_PROJECTS_FROM_CACHE, {variables: { ownerId: currentUserId }} );

    useEffect(() => {
        if (!projectDataLoading) {
            setUserProjects(projectData.projectsFromCache)
        }
    }, [projectData])

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
                    {userProjects.map(({ _id, name }) => (
                       <ListItem key={_id} className={classes.listItem}>
                       <ListItemIcon className={classes.listItem}>{<AppsOutlinedIcon />}</ListItemIcon>
                       {name}
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
