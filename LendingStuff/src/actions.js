import { createAction } from 'redux-act';

import { fetchItemsService, myItemsService, rentedItemsService } from './APIService';


export function fetchItems() {
  return (dispatch) => {
    dispatch(fetchItemsRequest());

    fetchItemsService()
      .then((payload) => dispatch(fetchItemsSuccess(payload)))
      .catch((err) => dispatch(fetchItemsError(err)))
  };
}

export function myItems(lender) {
  return (dispatch) => {
    dispatch(fetchItemsRequest());

    myItemsService(lender)
      .then((payload) => dispatch(fetchItemsSuccess(payload)))
      .catch((err) => dispatch(fetchItemsError(err)))
  };
}

export function rentedItems(renter) {
  return (dispatch) => {
    dispatch(fetchItemsRequest());

    rentedItemsService(renter)
      .then((payload) => dispatch(fetchItemsSuccess(payload)))
      .catch((err) => dispatch(fetchItemsError(err)))
  };
}

export const fetchItemsRequest = createAction('FETCH_ITEMS_REQUEST');
export const fetchItemsSuccess = createAction('FETCH_ITEMS_SUCCESS');
export const fetchItemsError = createAction('FETCH_ITEMS_ERROR');
