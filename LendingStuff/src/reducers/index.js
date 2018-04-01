import { combineReducers } from 'redux';

import itemsReducer from './items';
import authReducer from './auth'
import { transactionsReducer } from './transactions';

export default combineReducers({
  items: itemsReducer,
  auth: authReducer,
  transactions: transactionsReducer
});
