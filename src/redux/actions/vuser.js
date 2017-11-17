import * as types from '../actionType/vuser';

export function vuserset(vuser) {
	return {type: types.VUSERSET, vuser};
}

export function vuserunset() {
	return {type: types.VUSERUNSET};
}