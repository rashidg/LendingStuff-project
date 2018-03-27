import { createReducer } from 'redux-act';

import { fetchTransactionsRequest, fetchTransactionsSuccess, fetchTransactionsError } from '../actions';

const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false,
  errorMessage: ''
};

export const transactionsReducer = createReducer({
  [fetchTransactionsRequest]: (state) => ({ ...state, isFetching: true }),

  [fetchTransactionsSuccess]: (state, payload) => ({
    ...state,
    data: payload,
    isFetching: false,
    dataFetched: true
  }),

  [fetchTransactionsError]: (state, error) => ({
    ...state,
    data: [],
    isFetching: false,
    errorMessage: error
  })
}, initialState);
