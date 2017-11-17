import Immutable from 'seamless-immutable';

import * as types from '../actionType/vuser';

const initialState = Immutable({
	signhash: ''
});

export default function vuser(state = initialState, action = {}) {
	switch (action.type) {
		case types.VUSERSET :
			return Object.assign({}, state, {
				signhash: action.vuser.signhash
			});
		case types.VUSERUNSET :
			return Object.assign({}, state, {
				signhash: '',
			});
		default:
			return state;
	}
}
