import React, { useState, useRef } from 'react';
import { AppBar, Toolbar, IconButton, Button, makeStyles } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { ProjectSelectorDialog } from '.';
import SignInDialog from './SignInDialog';

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
        marginRight: theme.spacing(1),
    },
    icon: {
        color: theme.palette.primary.contrastText,
    },
}));

export default function Header({ dndOperation, onMenuIconClicked }) {
    const appBarRef = useRef(null);
    const classes = useStyles();
    const [shouldProjectSelectorOpen, setProjectSelectorOpen] = useState(false);
    const [shouldSignInDialogOpen, setSignInDialogOpen] = useState(false);

    return (
        <React.Fragment>
            <AppBar ref={appBarRef} position={'sticky'} className={classes.root}>
                <Toolbar>
                    <IconButton edge={'start'} onClick={() => onMenuIconClicked()}>
                        <Menu className={classes.icon} />
                    </IconButton>
                    <h1>
                        <span style={{ fontWeight: 100 }}>{'consiliumQ'}</span>
                    </h1>
                    <div className={classes.spacer} />
                    <Button variant={'contained'} onClick={() => setProjectSelectorOpen(!shouldProjectSelectorOpen)} className={classes.button}>
                        {'Select Project'}
                    </Button>
                    <Button variant={'contained'} onClick={() => setSignInDialogOpen(!shouldSignInDialogOpen)} className={classes.button}>
                        {'Temp SignIn button'}
                    </Button>
                </Toolbar>
            </AppBar>
            <ProjectSelectorDialog
                dndOperation={dndOperation}
                shouldProjectSelectorOpen={shouldProjectSelectorOpen}
                toggleProjectSelector={() => setProjectSelectorOpen(!shouldProjectSelectorOpen)}
            />
            <SignInDialog shouldSignInDialogOpen={shouldSignInDialogOpen} toggleSignInDialog={() => setSignInDialogOpen(!shouldSignInDialogOpen)} />
        </React.Fragment>
    );
}

Header.propTypes = {
    onMenuIconClicked: PropTypes.func.isRequired,
};
