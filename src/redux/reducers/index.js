// @flow
import {combineReducers} from 'redux';
import user from './user';
import app from './app';
import vuser from './vuser';

const reducers = combineReducers({
	app,
	user,
	vuser
});

export default reducers;
