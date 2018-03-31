import { createReducer } from 'redux-act';

import { logInRequest, logOutRequest, registerRequest } from '../actions';

const initialState = { isLoggedIn: false, user: null };

export default authReducer = createReducer({
  [logInRequest]: (state, payload) => ({ ...state, isLoggedIn: true, user: payload }),
  [logOutRequest]: (state) => ({ ...state, isLoggedIn: false, user: null })
}, initialState);
