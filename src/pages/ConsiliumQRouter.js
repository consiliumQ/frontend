import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';
import HomePage from './HomePage/HomePage';

const OktaConfig = {
    clientId: `${process.env.REACT_APP_OKTA_CLIENT_ID}`,
    issuer: `${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`,
    redirectUri: `${Location.host}${process.env.REACT_APP_OKTA_CALLBACK_PATH}`,
    scopes: process.env.REACT_APP_OKTA_SCOPES,
    pkce: true,
    logout: `${Location.host}/logout`,
};

export default function ConsiliumQRouter() {
    return (
        <Router>
            <Security {...OktaConfig}>
                <Switch>
                    <Route exact path={'/'} component={() => <Redirect to={'/homepage'} />} />
                    <Route path={'/user'} component={() => <h1>TODO: User DashBoard</h1>} />
                    <Route path={'/kanban'} component={() => <h1>TODO: Kanban board</h1>} />
                    <Route path={'/homepage'} component={() => <HomePage />} />
                </Switch>
            </Security>
        </Router>
    );
}
