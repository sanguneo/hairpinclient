import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import user from '../img/profile.png';

import * as userAction from '../redux/actions/user';

class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	login() {
		axios.post(
			'http://calbum.sanguneo.com/user/login',
			{
				email: document.querySelector('.form input[name=email]').value,
				password: document.querySelector('.form input[name=password]').value
			},
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		).then(response => {
			if (response.data.message === 'success') {
				const userinfo = {
					token: response.data.token,
					_id: response.data._id,
					email: response.data.email,
					signhash: response.data.signhash,
					name: response.data.nickname,
					status: true
				};
				this.props.dispatch(userAction.login(userinfo));
				window.sessionStorage.setItem('hairpinToken', JSON.stringify(userinfo));
			} else if (response.data.message === 'noaccount')  {
				alert('로그인 되어있지 않습니다.\n가입하시겠습니까?')
			} else if (response.data.message === 'invalidpw')  {
				alert('패스워드를 다시 확인해주세요.');
			}

		}).catch(e => {
			console.log('error', e);
		});
	}

	logout() {
		if(!confirm('로그아웃 하시겠습니까?')) return;
		window.sessionStorage.removeItem('hairpinToken');
		this.props.dispatch(userAction.logout());
	}

	render() {
		console.log(this.props.user.status);
		const userIcon = (this.props.user.token
				? `http://calbum.sanguneo.com/upload/profiles/${this.props.user.signhash}`
				: user
		)
		return (
			<div className="login">
				<div className={this.props.user.status ? "container loggedin" : "container"}>
					<img className="photo" src={userIcon} alt="profile" />
					{!this.props.user.status? <form className="form" onSubmit={(e)=> {e.preventDefault();this.login()}}>
						<input type="email" name="email" placeholder="E-MAIL 입력" defaultValue=""/>
						<input type="password" name="password" placeholder="PASSWORD 입력" defaultValue=""/>
						<input type="submit" value="Login" />
					</form> : null}
					{!this.props.user.status? null :
					<div className="info">
						<input type="text" defaultValue={this.props.user.name} readOnly={true}/>
						<input type="text" defaultValue={this.props.user.email} readOnly={true}/>
						<input type="button" value="Logout" onClick={()=> {this.logout()}}/>
					</div>}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({user: state.user});

export default connect (mapStateToProps) (Login);
