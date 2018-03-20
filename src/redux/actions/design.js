import * as types from '../actionType/design';

export function designset(design) {
	return {type: types.DESIGNSET, design};
}

export function designunset() {
	return {type: types.DESIGNUNSET};
}

export function tagset(tag) {
	return {type: types.TAGSET, tag};
}

export function tagunset() {
	return {type: types.TAGUNSET};
}