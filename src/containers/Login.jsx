import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import user from '../img/profile.png';

import * as userAction from '../redux/actions/user';

class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	login() {alert(1);
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
				};
				this.props.dispatch(userAction.login(userinfo));
				for (let key in userinfo) {
					sessionStorage.setItem(key, userinfo[key]);
				}
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
		const userinfo = ['token', '_id', 'email', 'signhash', 'name'];
		userinfo.forEach((key) => {
			sessionStorage.removeItem(key);
		});
		this.props.dispatch(userAction.logout());
	}

	render() {
		const userIcon = (this.props.user.status
				? `http://calbum.sanguneo.com/upload/profiles/${this.props.user.signhash}`
				: user
		)
		return (
			<div className="login">
				<div className="container">
					<img className="photo" src={userIcon} alt="profile" />
					{!this.props.user.status? <form className="form" onSubmit={(e)=> {e.preventDefault();this.login()}}>
						<input type="email" name="email" placeholder="E-MAIL 입력" defaultValue=""/>
						<input type="password" name="password" placeholder="PASSWORD 입력" defaultValue=""/>
						<input type="submit" value="Login" onClick={()=> {this.login()}}/>
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
