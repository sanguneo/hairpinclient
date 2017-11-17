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
export function menuopen() {
	return {type: types.MENUOPEN};
}
export function menuclose() {
	return {type: types.MENUCLOSE};
}
export function menutoggle() {
	return {type: types.MENUTOGGLE};
}
export function shadowmenuout() {
	return {type: types.SHADOWMENUOUT};
}