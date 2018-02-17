import { createReducer } from 'redux-act';

import { fetchItems } from '../actions';

export const itemsReducer = createReducer({
  [fetchItems]: (state) => {
    console.log("asd");
    return state;
  }
}, { items: [] });
