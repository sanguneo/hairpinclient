import * as types from '../actionType/user';

export function login(user) {
	return {type: types.LOGGEDIN, user};
}

export function logout() {
	return {type: types.LOGGEDOUT};
}