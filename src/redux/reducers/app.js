import Immutable from 'seamless-immutable';

import * as types from '../actionType/app';

const initialState = Immutable({
	shadow : false,
	menuopened : false,
	headerthin : false,
	loading : false,
	bottomad : true
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
		case types.SHADOWMENUOUT :
			return Object.assign({}, state, {
				shadow: false,
				menuopened: false
			});
		case types.MENUOPEN :
			return Object.assign({}, state, {
				menuopened: true
			});
		case types.MENUCLOSE :
			return Object.assign({}, state, {
				menuopened: false
			});
		case types.MENUTOGGLE :
			return Object.assign({}, state, {
				menuopened: !state.menuopened
			});
		case types.LOADING :
			return Object.assign({}, state, {
				loading: true
			});
		case types.LOADED :
			return Object.assign({}, state, {
				loading: false
			});
		case types.BOTTOMADSHOW :
			return Object.assign({}, state, {
				bottomad: true
			});
		case types.BOTTOMADHIDE :
			return Object.assign({}, state, {
				bottomad: false
			});
		default:
			return state;
	}
}