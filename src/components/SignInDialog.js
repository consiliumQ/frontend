import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import { withAuth } from '@okta/okta-react';
import { Redirect } from 'react-router-dom';
import OktaSignInWidget from './OktaSignInWidget';


export default withAuth(function SignInDialog({ auth, shouldSignInDialogOpen, toggleSignInDialog }) {
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
                    <OktaSignInWidget baseUrl={process.env.REACT_APP_OKTA_DOMAIN} onSuccess={onSuccess} onError={onError} />)}
        </DialogContent>
    </Dialog>
    )
});