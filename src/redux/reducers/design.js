import Immutable from 'seamless-immutable';

import * as types from '../actionType/design';

const initialState = Immutable({
	signhash: '',
	designHash: '',
	tag: ''
});

export default function design(state = initialState, action = {}) {
	switch (action.type) {
		case types.DESIGNSET :
			return Object.assign({}, state, action.design);
		case types.DESIGNUNSET :
			return Object.assign({}, state, {
				signhash: '',
				designHash: ''
			});
		case types.TAGSET :
			return Object.assign({}, state, {tag: action.tag});
		case types.TAGUNSET :
			return Object.assign({}, state, {tag:''});
		default:
			return state;
	}
}
