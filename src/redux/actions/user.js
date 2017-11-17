import axios from 'axios';

import * as types from '../actionType/user';

export function login(user) {
	return {type: types.LOGGEDIN, user};
}

export function logout() {
	window.sessionStorage.removeItem('hairpinToken');
	return {type: types.LOGGEDOUT};
}

export function loginAsync(userinfo, precallback) {
	return async (dispatch) => {
		axios.post(
			'http://hpserver.sanguneo.com/user/login',
			userinfo,
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		).then(response => {
			precallback();
			if (response.data.message === 'success') {
				const userinfo = {
					token: response.data.token,
					_id: response.data._id,
					email: response.data.email,
					signhash: response.data.signhash,
					name: response.data.nickname,
					status: true
				};
				window.sessionStorage.setItem('hairpinToken', JSON.stringify(userinfo));
				dispatch(login(userinfo));
			} else if (response.data.message === 'noaccount')  {
				alert('사용자 정보가 존재하지 않습니다.\n가입하시겠습니까?')
			} else if (response.data.message === 'invalidpw')  {
				alert('패스워드를 다시 확인해주세요.');
			}
		}).catch(e => {
			console.log('error', e);
		});
	};
}