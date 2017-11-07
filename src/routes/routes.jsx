import React from 'react';
import {Route, Switch} from 'react-router';

import CommonHeader from '../components/CommonHeader';
import Home from '../containers/Home';
import Features from '../containers/Features';
import Notice from '../containers/Notice';


export default () => (
    <div>
        <CommonHeader />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/features" component={Features} />
            <Route exact path="/notice" component={Notice} />
            <Route render={() => <h1>Not Found :(</h1>} />
        </Switch>
    </div>
);
