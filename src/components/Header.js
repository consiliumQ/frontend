import React, { useRef } from 'react';
import { AppBar, Toolbar, IconButton, Button, makeStyles } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#21252b',
        boxShadow: 'none',
    },
    spacer: {
        flexGrow: 1,
    },
    flatButton: {
        boxShadow: 'none',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    button: {
        boxShadow: 'none',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
    },
    icon: {
        color: theme.palette.primary.contrastText,
    },
}));

export default function Header(props) {
    const appBarRef = useRef(null);
    const classes = useStyles();

    const { onMenuIconClicked } = props;

    return (
        <React.Fragment>
            <AppBar ref={appBarRef} position={'sticky'} className={classes.root}>
                <Toolbar>
                    <IconButton edge={'start'} onClick={() => onMenuIconClicked()}>
                        <Menu className={classes.icon} />
                    </IconButton>
                    <h1>
                        <span style={{ fontWeight: 100 }}>consiliumQ</span>
                    </h1>
                    <div className={classes.spacer} />
                    <Button variant={'contained'} onClick={() => console.log('should open dialog')} className={classes.button}>
                        {'Placeholder'}
                    </Button>
                </Toolbar>
            </AppBar>
            {/* <Toolbar style={{ height: appBarRef.height }} /> */}
        </React.Fragment>
    );
}

Header.propTypes = {
    onMenuIconClicked: PropTypes.func.isRequired,
};
