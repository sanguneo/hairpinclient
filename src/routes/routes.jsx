/* eslint-disable no-return-assign */
import React from 'react';
import {Route, Switch} from 'react-router';

import CommonHeader from '../components/CommonHeader';
import Menu from '../components/Menu';
import Shadow from '../components/Shadow';
import Home from '../containers/Home';
import Features from '../containers/Features';
import Notice from '../containers/Notice';
import Login from '../containers/Login';

export default () => (
    <div id="appWrapper">
        <CommonHeader menu={this.menu} shadow={this.shadow}/>
        <Menu ref={ref => this.menu = ref}/>
        <Shadow ref={ref => this.shadow = ref}/>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/features" component={Features} />
            <Route exact path="/notice" component={Notice} />
            <Route exact path="/login" component={Login} />
            <Route render={() => <h1 style={{position: 'absolute', top: 'calc(50% - 20px)', left: 'calc(50% - 90px)'}}>Not Found :(</h1>} />
        </Switch>
    </div>
);
