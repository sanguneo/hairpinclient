import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import user from '../img/profile.png';

import * as userAction from '../redux/actions/user';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		}
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	login() {
		this.props.dispatch(userAction.loginAsync(this.state, () => {
			this.setState({email: '',password: ''});
		}));
	}

	logout() {
		if(!confirm('로그아웃 하시겠습니까?')) return;
		this.props.dispatch(userAction.logout());
	}

	handleInputChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	render() {
		const userIcon = (this.props.user.token
			? `http://hpserver.sanguneo.com/upload/profiles/${this.props.user.signhash}`
			: user
		);
		return (
			<div className="login">
				<div className={this.props.user.status ? "container loggedin" : "container"}>
					<img className="photo" src={userIcon} alt="profile" />
					{!this.props.user.status? <form className="form" onSubmit={(e)=> {e.preventDefault();this.login()}}>
						<input type="email" name="email" placeholder="E-MAIL 입력" value={this.state.email} onChange={this.handleInputChange}/>
						<input type="password" name="password" placeholder="PASSWORD 입력" value={this.state.password} onChange={this.handleInputChange}/>
						<input type="submit" value="Login" />
					</form> : null}
					{!this.props.user.status? null :
					<div className="info">
						<input type="text" defaultValue={this.props.user.name} readOnly/>
						<input type="text" defaultValue={this.props.user.email} readOnly/>
						<input type="button" value="Logout" onClick={()=> {this.logout()}}/>
					</div>}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({user: state.user});

export default connect (mapStateToProps) (Login);
