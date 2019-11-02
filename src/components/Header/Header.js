import React, { useRef } from 'react';
import { AppBar, Toolbar, IconButton, makeStyles, Button } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.light,
        boxShadow: 'none',
    },
    spacer: {
        flexGrow: 1,
    },
    flatButton: {
        boxShadow: 'none',
    },
}));

export default function Header(props) {
    const appBarRef = useRef(null);
    const classes = useStyles();

    const { onMenuIconClicked } = props;

    return (
        <React.Fragment>
            <AppBar ref={appBarRef} position={'fixed'} className={classes.root}>
                <Toolbar>
                    <IconButton edge={'start'} onClick={() => onMenuIconClicked()}>
                        <Menu />
                    </IconButton>
                    <h1>CQ Kanban</h1>
                    <div className={classes.spacer} />
                    <Button variant={'contained'} onClick={() => console.log('Place holder button clicked!')} className={classes.flatButton}>
                        {'PlaceHolder'}
                    </Button>
                </Toolbar>
            </AppBar>
            <Toolbar style={{ height: appBarRef.clientHeight }} />
        </React.Fragment>
    );
}

Header.propTypes = {
    onMenuIconClicked: PropTypes.func.isRequired,
};
