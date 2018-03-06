import { createReducer } from 'redux-act';

import { getDataSuccess, getData } from '../actions';

import { itemList } from '../dummyData';

const initialState = {
  data: itemList,
  dataFetched: false,
  isFetching: false,
  error: false
};

export const itemsReducer = createReducer({
  [getData]: (state) => ({ ...state, isFetching: true }),

  [getDataSuccess]: (state, payload) => ({
    ...state,
    data: payload.items,
    isFetching: false,
    dataFetched: true
  })
}, initialState);
