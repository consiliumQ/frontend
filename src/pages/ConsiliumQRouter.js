import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './HomePage/HomePage';

export default function ConsiliumQRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path={'/'} component={() => <Redirect to={'/homepage'} />} />
                <Route path={'/user'} component={() => <h1>TODO: User DashBoard</h1>} />
                <Route path={'/kanban'} component={() => <h1>TODO: Kanban board</h1>} />
                <Route path={'/homepage'} component={() => <HomePage />} />
            </Switch>
        </Router>
    );
}
