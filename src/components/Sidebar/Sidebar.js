import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Avatar, Grid, Chip } from '@material-ui/core';
import TimelineIcon from '@material-ui/icons/Timeline';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import mijeong from '../../assets/images/mj.png';

const useStyles = makeStyles({
    list: {
        width: 300,
        backgroundColor: '#21252b',
        flexGrow: 1,
        paddingTop: '3rem',
    },
    bigAvatar: {
        margin: 10,
        width: 120,
        height: 120,
        marginBottom: '3rem',
    },
    chip: {
        marginTop: '2rem',
        backgroundColor: '#3c4049',
        color: '#d7dae0',
        fontSize: '130%',
    },
    listItem: {
        color: '#d7dae0',
        fontSize: '110%',
    },
});

// Divide case into Loggedin, !Loggedin
// Loggedin -> Actual Profile
// !Loggedin -> Login/Signup button
export default function SideBar(props) {
    const classes = useStyles();

    return (
        <Drawer className={classes.drawer} open={props.shouldSideBarOpen} onClose={() => props.toggleSideBar()}>
            <div className={classes.list} role="presentation">
                <Grid container justify="center" alignItems="center">
                    <Avatar alt="prettymj" src={mijeong} className={classes.bigAvatar} />
                </Grid>
                <Divider />
                <Grid container justify="center" alignItems="center">
                    <Chip className={classes.chip} label="Overview" />
                </Grid>
                <List>
                    {['Visualization', 'Backlogs'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon className={classes.listItem}>
                                {index % 2 === 0 ? <TimelineIcon /> : <AccountTreeOutlinedIcon />}
                            </ListItemIcon>
                            <ListItemText className={classes.listItem} primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Grid container justify="center" alignItems="center">
                    <Chip className={classes.chip} label="Your Projects" />
                </Grid>
                <List>
                    {['Project1', 'Project'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon className={classes.listItem}>{<AppsOutlinedIcon />}</ListItemIcon>
                            <ListItemText className={classes.listItem} primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
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

SideBar.propTypes = {
    shouldSideBarOpen: PropTypes.bool.isRequired,
    toggleSideBar: PropTypes.func.isRequired,
};
