import { createAction } from 'redux-act';

import { fetchItemsService, fetchMyItemsService, fetchRentedItemsService, postItemsService } from './APIService';


export function fetchItems() {
  return (dispatch) => {
    dispatch(fetchItemsRequest());

    fetchItemsService()
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

/* UNTESTED
export function searchItems(criteria) {
  return (dispatch) => {
    dispatch(fetchItemsRequest());

    searchItemsService(criteria)
      .then((payload) => dispatch(fetchItemsSuccess(payload)))
      .catch((err) => dispatch(fetchItemsError(err)))
  };
}
*/

export const fetchItemsRequest = createAction('FETCH_ITEMS_REQUEST');
export const fetchItemsSuccess = createAction('FETCH_ITEMS_SUCCESS');
export const fetchItemsError = createAction('FETCH_ITEMS_ERROR');


export function postItem(data, successCB, errorCB) {
  return () => {
    postItemsService(data)
      .then(() => successCB())
      .catch(() => errorCB())
  }
}
