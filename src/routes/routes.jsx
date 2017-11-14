import React from 'react';
import {Route, Switch} from 'react-router';

import CommonHeader from '../components/CommonHeader';
import Shadow from '../components/Shadow';
import Home from '../containers/Home';
import Features from '../containers/Features';
import Notice from '../containers/Notice';
import Login from '../containers/Login';


export default () => (
    <div>
        <CommonHeader />
        <Shadow />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/features" component={Features} />
            <Route exact path="/notice" component={Notice} />
            <Route exact path="/login" component={Login} />
            <Route render={() => <h1>Not Found :(</h1>} />
        </Switch>
    </div>
);
