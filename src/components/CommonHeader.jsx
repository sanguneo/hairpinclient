import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';


import * as appAction from '../redux/actions/app';

import '../css/header.scss';

import hairpinLogo from '../img/logo.png';
import menu from '../img/menu.svg';
import user from '../img/user.svg';

class CommonHeader extends React.Component {
	constructor(props) {
		super(props);
		this.loginroute = this.loginroute.bind(this);
	}

	loginroute(){
		this.forceUpdate(()=>{
			this.props.shadow.forceUpdate();
			this.props.menu.forceUpdate();
			this.props.dispatch(appAction.shadowmenuout());
		});
	}

	menutoggle() {
		this.props.dispatch(appAction.menutoggle());
		this.props.dispatch(appAction.shadowtoggle());
	}

	render() {
		const thin = window.location.pathname !== '/';
		const userIcon = (this.props.user.status
			? `http://hpserver.sanguneo.com/upload/profiles/${this.props.user.signhash}`
			: user
		);
		return <header className={thin ? "commonHeader thin" : "commonHeader"}>
			<img className="logo" src={hairpinLogo} alt="hairpin"/>
			<img className="menu" src={menu} alt="menu" onClick={()=> this.menutoggle()}/>
			<NavLink to="/login" className="user" activeClassName="active">
				<img className={this.props.user.status ? "userimg loggedIn" : "userimg"} onClick={this.loginroute} src={userIcon} alt="user"/>
			</NavLink>
		</header>;
	}
}



const mapStateToProps = state => ({app: state.app, user: state.user});

export default connect (mapStateToProps) (CommonHeader);
