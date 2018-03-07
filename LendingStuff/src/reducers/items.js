import { createReducer } from 'redux-act';

import {fetchItemsRequest, fetchItemsSuccess, fetchItemsError, postItemRequest} from '../actions';

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
    isFetching: false,
    errorMessage: error
  }),

  [postItemRequest]: (state, payload) => ({
    ...state,
    data: [...state.data, payload]
  }),

}, initialState);
