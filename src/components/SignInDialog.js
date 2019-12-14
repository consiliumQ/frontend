import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, Avatar, Button, TextField, Link, Grid, Typography, Container, makeStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withAuth } from '@okta/okta-react';
import { Redirect } from 'react-router-dom';
import OktaSignInWidget from './OktaSignInWidget';

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

export default withAuth(function SignUpDialog({ auth, shouldSignInDialogOpen, toggleSignInDialog }) {
    const classes = useStyles();
    const [authenticated, setAuthenticated] = useState(false);

    function onSuccess(res) {
        console.log(res);
        if (res.status === 'SUCCESS') {
            console.log(auth);
            return auth.redirect({
                sessionToken: res.session.token,
            });
        }
        // The user can be in another authentication state that requires further action.
        // For more information about these states, see:
        //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
    }

    function onError(err) {
        console.log('error logging in', err);
    }

    useEffect(() => {
        async function checkAuthenticated() {
            const loggedIn = await auth.isAuthenticated();

            if (loggedIn !== authenticated) {
                setAuthenticated(loggedIn);
            }
        }
        checkAuthenticated().then();
    }, []);

    return (
        <Dialog open={shouldSignInDialogOpen} onClose={toggleSignInDialog}>
            <DialogContent>
                {authenticated ? (
                    <Redirect to={{ pathname: '/' }} />
                ) : (
                    <OktaSignInWidget baseUrl={process.env.REACT_APP_OKTA_DOMAIN} onSuccess={onSuccess} onError={onError} />
                )}
                {/* <Container component="main" maxWidth="xs"> */}
                {/*    <div className={classes.paper}> */}
                {/*        <Avatar className={classes.avatar}> */}
                {/*            <LockOutlinedIcon /> */}
                {/*        </Avatar> */}
                {/*        <Typography component="h1" variant="h5"> */}
                {/*            Sign in */}
                {/*        </Typography> */}
                {/*        <form className={classes.form} noValidate> */}
                {/*            <TextField */}
                {/*                variant="outlined" */}
                {/*                margin="normal" */}
                {/*                required */}
                {/*                fullWidth */}
                {/*                id="email" */}
                {/*                label="Email Address" */}
                {/*                name="email" */}
                {/*                autoComplete="email" */}
                {/*                autoFocus */}
                {/*            /> */}
                {/*            <TextField */}
                {/*                variant="outlined" */}
                {/*                margin="normal" */}
                {/*                required */}
                {/*                fullWidth */}
                {/*                id="username" */}
                {/*                label="Username" */}
                {/*                name="username" */}
                {/*                autoComplete="username" */}
                {/*                autoFocus */}
                {/*            /> */}
                {/*            <TextField */}
                {/*                variant="outlined" */}
                {/*                margin="normal" */}
                {/*                required */}
                {/*                fullWidth */}
                {/*                name="password" */}
                {/*                label="Password" */}
                {/*                type="password" */}
                {/*                id="password" */}
                {/*                autoComplete="current-password" */}
                {/*            /> */}
                {/*            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}> */}
                {/*                Sign In */}
                {/*            </Button> */}
                {/*            <Grid container> */}
                {/*                <Grid item xs> */}
                {/*                    <Link href="#" variant="body2"> */}
                {/*                        Forgot password? */}
                {/*                    </Link> */}
                {/*                </Grid> */}
                {/*                <Grid item> */}
                {/*                    <Link href="#" variant="body2"> */}
                {/*                        {"Don't have an account? Sign Up"} */}
                {/*                    </Link> */}
                {/*                </Grid> */}
                {/*            </Grid> */}
                {/*        </form> */}
                {/*    </div> */}
                {/* </Container> */}
            </DialogContent>
        </Dialog>
    );
});
