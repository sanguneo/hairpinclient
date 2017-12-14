// @flow
import {combineReducers} from 'redux';
import user from './user';
import app from './app';
import vuser from './vuser';
import design from './design';

const reducers = combineReducers({
	app,
	user,
	vuser,
	design
});

export default reducers;
