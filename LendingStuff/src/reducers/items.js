import { createReducer } from 'redux-act';

import { fetchItemsRequest, fetchItemsSuccess, fetchItemsError } from '../actions';

const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false,
  errorMessage: ''
};

export const itemsReducer = createReducer({
  [fetchItemsRequest]: (state) => ({ ...state, isFetching: true }),

  [fetchItemsSuccess]: (state, payload) => ({
    ...state,
    data: payload,
    isFetching: false,
    dataFetched: true
  }),

  [fetchItemsError]: (state, error) => ({
    ...state,
    data: [],
    isFetching: false,
    errorMessage: error
  })
}, initialState);
