import { createReducer } from 'redux-act';

import { logInRequest, logOutRequest, registerRequest } from '../actions';


let initialState = { isLoggedIn: false, user: null };

export const authReducer = createReducer({
	[registerRequest]: (state, payload) => ({ ...state, isLoggedIn: true, user:payload}),
  	[logInRequest]: (state, payload) => ({ ...state, isLoggedIn: true, user: payload }),
  	[logOutRequest]: (state) => ({ ...state, isLoggedIn: false, user: null })
}, initialState);