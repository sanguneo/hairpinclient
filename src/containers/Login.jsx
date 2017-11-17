import React from 'react';
import {connect} from 'react-redux';

import user from '../img/profile.png';

import * as userAction from '../redux/actions/user';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.loginInfo = {email: '', password: ''};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleInputReset = this.handleInputReset.bind(this);
	}

	login() {
		this.props.dispatch(userAction.loginAsync(this.loginInfo, () => {
			this.handleInputReset()
		}));
	}

	logout() {
		if(!confirm('로그아웃 하시겠습니까?')) return;
		this.props.dispatch(userAction.logout(), () => {
			this.handleInputReset();
		});
	}
	handleInputReset() {
		this.loginInfo.email = '';
		this.loginInfo.password = '';
	}
	handleInputChange(event) {
		this.loginInfo[event.target.name]= event.target.value;
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
					{!this.props.user.status? <form className="form">
						<input type="email" name="email" placeholder="E-MAIL 입력" onChange={this.handleInputChange}/>
						<input type="password" name="password" placeholder="PASSWORD 입력" onChange={this.handleInputChange}/>
						<input type="button" value="Login" onClick={() => this.login()}/>
					</form> : null}
					{!this.props.user.status? null :
					<div className="info">
						<div className="username">{this.props.user.name}</div>
						<div className="myCounts">
							<div className="follower">
								<div className="indi">19</div>
								<div className="label">designs</div>
							</div>
							<div className="following">
								<div className="indi">19</div>
								<div className="label">following</div>
							</div>
							<div className="designcnt">
								<div className="indi">19</div>
								<div className="label">follower</div>
							</div>
						</div>
						<input type="button" value="Logout" onClick={()=> {this.logout()}}/>
					</div>}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({user: state.user});

export default connect (mapStateToProps) (Login);
