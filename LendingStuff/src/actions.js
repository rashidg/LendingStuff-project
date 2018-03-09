import { createAction } from 'redux-act';


import {
  fetchItemsService,
  fetchMyItemsService,
  fetchRentedItemsService,
  updateRentedItemService,
  postItemsService,
  createTransactionService
} from './APIService';

 
export const fetchItemsRequest = createAction('FETCH_ITEMS_REQUEST');
export const fetchItemsSuccess = createAction('FETCH_ITEMS_SUCCESS');
export const fetchItemsError = createAction('FETCH_ITEMS_ERROR');


export function fetchItems(query) {
  return (dispatch) => {
    dispatch(fetchItemsRequest());

    fetchItemsService(query)
      .then((payload) => dispatch(fetchItemsSuccess(payload)))
      .catch((err) => dispatch(fetchItemsError(err)));
  };
}

export function fetchMyItems(lender) {
  return (dispatch) => {
    dispatch(fetchItemsRequest());

    fetchMyItemsService(lender)
      .then((payload) =>
        {
          if (payload != null) {
            dispatch(fetchItemsSuccess(payload));
          }
          else {
            dispatch(fetchItemsSuccess([]));
          }
        }
      )
      .catch((err) => dispatch(fetchItemsError(err)));
  };
}

export function fetchRentedItems(renter) {
  return (dispatch) => {
    dispatch(fetchItemsRequest());

    fetchRentedItemsService(renter)
      .then((payload) =>
        {
          if (payload != null) {
            dispatch(fetchItemsSuccess(payload));
          }
          else {
            dispatch(fetchItemsSuccess([]));
          }
        }
      )
      .catch((err) => dispatch(fetchItemsError(err)));
  };
}

export function updateRentedItem(item_id){
  return (dispatch) => {
    dispatch(fetchItemsRequest());

    updateRentedItemService(item_id)
      .then(() =>
        {
            dispatch(fetchItemsSuccess([]));
        }
      )
      .catch((err) => dispatch(fetchItemsError(err)))
  };
}

export function createTransaction(item_id, renter){
  return (dispatch) => {
    dispatch(fetchItemsRequest());

    createTransactionService(item_id, renter)
      .then(() =>
        {
            dispatch(fetchItemsSuccess([]));
        }
      )
      .catch((err) => dispatch(fetchItemsError(err)))
  };
}

export function postItem(data, successCB, errorCB) {
  return (dispatch) => {
    postItemsService(data)
      .then(() => successCB())
      .catch(() => errorCB())
  }
}
