import * as types from '../actionType/vuser';

export function designset(design) {
	return {type: types.DESIGNSET, design};
}

export function designunset() {
	return {type: types.DESIGNUNSET};
}