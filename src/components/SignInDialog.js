import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, Avatar, Button, TextField, Link, Grid, Typography, Container, makeStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
const fetch = require('node-fetch');

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(7),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUpDialog({ shouldSignInDialogOpen, toggleSignInDialog }) {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const usernameCB = useCallback(e => setUsername(e.target.value), []);
    const passwordCB = useCallback(e => setPassword(e.target.value), []);
    const basicAuth = Buffer.from([process.env.REACT_APP_OKTA_CLIENT_ID, process.env.REACT_APP_OKTA_CLIENT_SECRET].join(':')).toString('base64');

    async function loginFormSubmit() {
        try {
            const response = await fetch(`${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default/v1/token`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${basicAuth}`,
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username,
                password,
                grant_type: 'password',
                scope: 'openid',
            }).toString(),
        });

        const { error_description: errorDescription, access_token: accessToken } = await response.json();

        if (errorDescription) {
            console.log(errorDescription);
        }
        console.log(accessToken);
        localStorage.setItem(process.env.REACT_APP_STORAGE_TOKEN, accessToken);
    } catch(e) {
        console.log(e);
    }
}

    return (
        <Dialog open={shouldSignInDialogOpen} onClose={toggleSignInDialog}>
            <DialogContent>
                <Container component="main" maxWidth="xs">
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onChange={usernameCB}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={passwordCB}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={async () => {
                                    await loginFormSubmit();
                                }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </DialogContent>
        </Dialog>
    );
}