import React from 'react';
import {Route, Switch} from 'react-router';

import About from '../containers/About';
import Header from '../components/Header';
import CommonHeader from '../components/CommonHeader';
import Features from '../components/Features';

export default () => (
    <div>
        <CommonHeader />
        <Switch>
            <Route exact path="/" component={About} />
            <Route exact path="/features" component={Features} />
            <Route render={() => <h1>Not Found :(</h1>} />
        </Switch>
    </div>
);
