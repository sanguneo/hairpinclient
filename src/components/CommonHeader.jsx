import React from 'react';
import {connect} from 'react-redux';

import {NavLink} from 'react-router-dom';

import * as appAction from '../redux/actions/app';

import hairpinLogo from '../img/logo.png';
import menu from '../img/menu.svg';
import user from '../img/user.svg';

import '../css/header.scss';

class CommonHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menuOpened: false,
			loginthin: false
		};
	}

	loginroute(){
		this.setState({loginthin:true}, ()=>{
			this.setState({loginthin: false});
		});
	}

	menutoggle() {
		this.setState({ menuOpened : !this.state.menuOpened }, ()=>{
			if (this.state.menuOpened) {
				this.props.dispatch(appAction.shadowin());
			} else {
				this.props.dispatch(appAction.shadowout());
			}
		});

	}

	menuclose() {
		this.setState({ menuOpened : false });
		this.props.dispatch(appAction.shadowout());
	}

	render() {
		const thin = this.state.loginthin||window.location.pathname !== '/';
		const userIcon = (this.props.user.status
			? `http://calbum.sanguneo.com/upload/profiles/${this.props.user.signhash}`
			: user
		);
		return <header className={thin ? "commonHeader thin" : "commonHeader"}>
			<img className="logo" src={hairpinLogo} alt="hairpin"/>
			<img className="menu" src={menu} alt="menu" onClick={()=> this.menutoggle()}/>
			<NavLink to="/login" className="user" activeClassName="active">
				<img className={this.props.user.status ? "user loggedIn" : "user"} onClick={() => {this.loginroute()}} src={userIcon} alt="user"/>
			</NavLink>
			<ul className={this.state.menuOpened ? "nav opened" : "nav"}>
				<li className="item">
					<NavLink to="/" className="link" exact activeClassName="active" onClick={()=> this.menuclose()}>
						메인
					</NavLink>
				</li>
				<li className="item">
					<NavLink to="/features" className="link" activeClassName="active" onClick={()=> this.menuclose()}>
						기능
					</NavLink>
				</li>
				<li className="item">
					<NavLink to="/notice" className="link" activeClassName="active" onClick={()=> this.menuclose()}>
						공지사항
					</NavLink>
				</li>
			</ul>
		</header>;
	}
}



const mapStateToProps = state => ({app: state.app, user: state.user});

export default connect (mapStateToProps) (CommonHeader);
