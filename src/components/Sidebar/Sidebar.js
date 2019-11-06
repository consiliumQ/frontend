import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Avatar, Grid, Chip } from '@material-ui/core';
import TimelineIcon from '@material-ui/icons/Timeline';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import mijeong from '../../assets/images/mj.png';

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
export default function SideBar(props) {
    const classes = useStyles();

    return (
        <Drawer className={classes.drawer} open={props.shouldSideBarOpen} onClose={() => props.toggleSideBar()}>
            <div className={classes.list} role={'presentation'}>
                <Grid container justify={'center'} alignItems={'center'}>
                    <Avatar alt={'prettymj'} src={mijeong} className={classes.bigAvatar} />
                </Grid>
                <Divider className={classes.divider} />
                <Grid container justify={'center'} alignItems={'center'}>
                    <Chip className={classes.chip} label={'Overview'} />
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
                <Divider className={classes.divider} />
                <Grid container justify={'center'} alignItems={'center'}>
                    <Chip className={classes.chip} label={'Your Projects'} />
                </Grid>
                <List>
                    {['Project1', 'Project'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon className={classes.listItem}>{<AppsOutlinedIcon />}</ListItemIcon>
                            <ListItemText className={classes.listItem} primary={text} />
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

SideBar.propTypes = {
    shouldSideBarOpen: PropTypes.bool.isRequired,
    toggleSideBar: PropTypes.func.isRequired,
};
