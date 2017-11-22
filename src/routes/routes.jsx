/* eslint-disable no-return-assign */
import React from 'react';
import {Route, Switch} from 'react-router';

import CommonHeader from '../components/CommonHeader';
import Menu from '../components/Menu';
import Shadow from '../components/Shadow';
import Home from '../containers/Home';
import Notice from '../containers/Notice';
import Login from '../containers/Login';
import Vuser from '../containers/Vuser';
import Vuserlist from '../containers/Vuserlist';
import Loading from "../components/Loading";
import GoogleBottomAd from "../components/GoogleBottomAd";

export default () => (
    <div id="appWrapper">
        <CommonHeader menu={this.menu} shadow={this.shadow}/>
        <Menu ref={ref => this.menu = ref}/>
        <Shadow ref={ref => this.shadow = ref}/>
		<Loading />
		<GoogleBottomAd />
        <Switch>
            <Route exact path="/" component={Home} />
			<Route exact path="/login" component={Login} />
            <Route exact path="/notice" component={Notice} />
			<Route exact path="/vuser" component={Vuser} />
			<Route exact path="/vuserlist" component={Vuserlist} />
            <Route render={() => <h1 style={{position: 'absolute', top: 'calc(50% - 20px)', left: 'calc(50% - 90px)'}}>Not Found :(</h1>} />
        </Switch>

    </div>
);
