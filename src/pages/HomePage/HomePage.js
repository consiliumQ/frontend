import React from 'react';
import { Paper, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Header } from '../../components';

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
    return (
        <>
            <Header onMenuIconClicked={() => console.log('menu button click')} />
            <Grid container>
                <Grid item xs={3}>
                    <Paper className={classes.root}>
                        <h2 className={classes.fontStyle}>Hello this is home page</h2>
                        <p className={classes.fontStyle}>Just tryna play around</p>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default HomePage;
