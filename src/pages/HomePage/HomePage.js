import React, { useState } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Header } from '../../components';
import Sidebar from '../../components/Sidebar/Sidebar';

const useStyle = makeStyles(theme => ({
    root: {
        backgroundColor: '#EE6C4D',
        padding: 16,
        margin: 16,
    },

    fontStyle: {
        color: '#293241',
    },
}));

const HomePage = props => {
    const classes = useStyle(props);
    const [shouldSideBarOpen, setSideBarOpen] = useState(false);
    return (
        <>
            <Header onMenuIconClicked={() => setSideBarOpen(!shouldSideBarOpen)} />
            <Grid container>
                <Grid item xs={3}>
                    <Paper className={classes.root}>
                        <h2 className={classes.fontStyle}>Hello this is home page</h2>
                        <p className={classes.fontStyle}>Just tryna play around</p>
                    </Paper>
                </Grid>
            </Grid>
            <Sidebar shouldSideBarOpen={shouldSideBarOpen} toggleSideBar={() => setSideBarOpen(!shouldSideBarOpen)} />
        </>
    );
};

export default HomePage;
