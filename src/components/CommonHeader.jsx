import React from 'react';
import {NavLink, Redirect} from 'react-router-dom';

import hairpinLogo from '../img/logo.png';
import menu from '../img/menu.svg';
import user from '../img/user.svg';

import '../css/header.scss';

class CommonHeader extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			thin: true,
			menuOpened: false,
			user: false
		};
	}

	render() {
		return <header className={this.state.thin ? "commonHeader thin" : "commonHeader"}>
			<img className="logo" src={hairpinLogo} alt="hairpin" onClick={()=> this.setState({ thin : !this.state.thin, menuOpened: false })}/>
			<img className="menu" src={menu} alt="menu" onClick={()=> this.setState({ menuOpened : !this.state.menuOpened })}/>
			<NavLink to="/features" className="user" activeClassName="active">
				<img className="user" src={user} alt="user"/>
			</NavLink>
			{this.state.user ? <Redirect push to="/features" /> : null}
			<ul className={this.state.menuOpened ? "nav opened" : "nav"}>
				<li className="item">
					<NavLink to="/" className="link" exact activeClassName="active">
						메인
					</NavLink>
				</li>
				<li className="item">
					<NavLink to="/features" className="link" activeClassName="active">
						기능
					</NavLink>
				</li>
				<li className="item">
					<NavLink to="/notice" className="link" activeClassName="active">
						공지사항
					</NavLink>
				</li>
			</ul>
			<div className={this.state.menuOpened ? "bg opened" : "bg"} onClick={()=> this.setState({ menuOpened : false })}></div>
		</header>;
	}
}


export default CommonHeader;
