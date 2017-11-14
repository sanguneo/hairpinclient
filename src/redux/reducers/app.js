import Immutable from 'seamless-immutable';

import * as types from '../actionType/app';

const initialState = Immutable({
	shadow : false,
	headerthin : false
});

export default function app(state = initialState, action = {}) {
	switch (action.type) {
		case types.SHADOWIN :
			return Object.assign({}, state, {
				shadow: true
			});
		case types.SHADOWOUT :
			return Object.assign({}, state, {
				shadow: false
			});
		case types.SHADOWTOGGLE :
			return Object.assign({}, state, {
				shadow: !state.shadow
			});
		default:
			return state;
	}
}