import Immutable from 'seamless-immutable';

import * as types from '../actionType/user';

const initialState = Immutable({
	status : false,
	token: '',
	_id: '',
	email: '',
	signhash: '',
	name: ''
});

export default function user(state = initialState, action = {}) {
	switch (action.type) {
		case types.LOGGEDIN :
			return Object.assign({}, state, {
				status: true,
				...action.user
			});
		case types.LOGGEDOUT :
			return Object.assign({}, state, {
				status: false,
				token: '',
				_id: '',
				email: '',
				signhash: '',
				name: ''
			});
		default:
			return state;
	}
}