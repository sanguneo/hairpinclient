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

export function loading() {
	return {type: types.LOADING};
}
export function loaded() {
	return {type: types.LOADED};
}

export function bottomadshow() {
	return {type: types.BOTTOMADSHOW};
}
export function bottomadhide() {
	return {type: types.BOTTOMADHIDE};
}