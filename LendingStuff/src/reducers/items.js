import { createReducer } from 'redux-act';

import {fetchItemsRequest, fetchItemsSuccess, fetchItemsError, fetchReviewsSuccess, fetchReviewsError} from '../actions';

const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false,
  errorMessage: '',
  reviews: []
};

export default itemsReducer = createReducer({
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
  }),

  [fetchReviewsSuccess]: (state, payload) => ({
    ...state,
    reviews: payload
  }),

  [fetchReviewsError] : (state) => ({
    ...state,
    reviews: []
  })
}, initialState);
