import { createAction } from 'redux-act';
import { Actions } from 'react-native-router-flux';


import {
  fetchItemsService,
  fetchMyItemsService,
  fetchRentedItemsService,
  updateRentedItemService,
  updateRequestedItemService,
  refuseRequestedItemService,
  postItemsService,
  createTransactionService,
  fetchReviewsService,
  postReviewService,
  registerService,
  logInService,
  returnTransactionService,
  gotbackTransactionService,
  closeItemService,
  fetchItemTransactionService
} from './APIService';


export const fetchItemsRequest = createAction('FETCH_ITEMS_REQUEST');
export const fetchItemsSuccess = createAction('FETCH_ITEMS_SUCCESS');
export const fetchItemsError = createAction('FETCH_ITEMS_ERROR');
export const fetchReviewsSuccess = createAction('FETCH_REVIEWS_SUCCESS');
export const fetchReviewsError = createAction('FETCH_REVIEWS_ERROR');
export const logInRequest = createAction('LOG_IN');
export const logOutRequest = createAction('LOG_OUT');

export const fetchTransactionsRequest = createAction('FETCH_TRANSACTIONS_REQUEST');
export const fetchTransactionsSuccess = createAction('FETCH_TRANSACTIONS_SUCCESS');
export const fetchTransactionsError = createAction('FETCH_TRANSACTIONS_ERROR');

export function fetchItems(query) {
  return (dispatch) => {
    dispatch(fetchItemsRequest());

    fetchItemsService(query)
      .then((payload) => dispatch(fetchItemsSuccess(payload)))
      .catch((err) => dispatch(fetchItemsError(err)));
  };
}

export function fetchMyItems(email) {
  return (dispatch) => {
    dispatch(fetchItemsRequest());

    fetchMyItemsService(email)
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

export function fetchItemTransaction(item_id) {
  return (dispatch) => {
    dispatch(fetchTransactionsRequest());
    fetchItemTransactionService(item_id)
      .then((payload) =>
        {
          if (payload != null)
            dispatch(fetchTransactionsSuccess(payload));
          else
            dispatch(fetchTransactionsSuccess([]));
        })
      .catch((err) => dispatch(fetchTransactionsError(err)));
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
    updateRentedItemService(item_id);
    dispatch(fetchItems());
  };
}

export function updateRequestedItem(item_id){
  return (dispatch) => {
    updateRequestedItemService(item_id);
    dispatch(fetchItems());
  };
}

export function refuseRequestedItem(item_id){
  return (dispatch) => {
    refuseRequestedItemService(item_id);
    dispatch(fetchItems());
  };
}

export function createTransaction(item_id, lender, renter, duration){
  return (dispatch) => {
    createTransactionService(item_id, lender, renter, duration);
  };
}

export function returnTransaction(item_id){
  return (dispatch) => {
    returnTransactionService(item_id);
  };
}

export function gotbackTransaction(item_id){
  return (dispatch) => {
    gotbackTransactionService(item_id);
  };
}


export function closeItem(item_id) {
  return (dispatch) => {
    closeItemService(item_id);
    dispatch(fetchItems());
  };
}

export function postItem(item, successCB, errorCB) {
  return (dispatch) => {
    postItemsService(item)
      .then(successCB)
      .catch(errorCB);
  }
}

export function fetchReviews(item_id) {
  return (dispatch) => {
    fetchReviewsService(item_id)
      .then((payload) => {
        if (payload != null) {
          dispatch(fetchReviewsSuccess(payload))
        } else {
          dispatch(fetchReviewsSuccess([]))
        }
      })
      .catch(() => {
        dispatch(fetchReviewsError())});
  }
}

export function postReview(data, successCB, errorCB) {
  return (dispatch) => {
    postReviewService(data)
      .then(() => {
        dispatch(fetchReviews(data.item_id));
        successCB();
      })
      .catch(errorCB);
  }
}

export function register(data, successCB, errorCB) {
  return (dispatch) => {

    registerService(data)
      .then((payload) => {
        alert('registration successful');
      })
      .catch((err) => alert(err));
  }
}

export function login(data) {
  return (dispatch) => {
    logInService(data)
      .then((user) => {
        dispatch(logInRequest(user));
        Actions.itemList();
      })
      .catch((err) => alert(err))
  }
}