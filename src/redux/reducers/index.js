// @flow
import {combineReducers} from 'redux';
import user from './user';
import app from './app';

const reducers = combineReducers({
	app,
	user
});

export default reducers;
