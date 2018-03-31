import { combineReducers } from 'redux';

import itemsReducer from './items';
import authReducer from './auth'

export default combineReducers({
  items: itemsReducer,
  auth: authReducer
});
