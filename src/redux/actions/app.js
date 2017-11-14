import * as types from '../actionType/app';

export function shadowin() {
	return {type: types.SHADOWIN};
}
export function shadowout() {
	return {type: types.SHADOWOUT};
}
export function shadowtoggle() {
	return {type: types.SHADOWTOGGLE};
}
