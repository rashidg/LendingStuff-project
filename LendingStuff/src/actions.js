import { createAction } from 'redux-act';
import { Actions } from 'react-native-router-flux';


import {
  fetchItemsService,
  fetchMyItemsService,
  fetchRentedItemsService,
  updateRentedItemService,
  postItemsService,
  createTransactionService,
  fetchReviewsService,
  postReviewService,
  registerService,
  logInService
} from './APIService';

 
export const fetchItemsRequest = createAction('FETCH_ITEMS_REQUEST');
export const fetchItemsSuccess = createAction('FETCH_ITEMS_SUCCESS');
export const fetchItemsError = createAction('FETCH_ITEMS_ERROR');
export const fetchReviewsSuccess = createAction('FETCH_REVIEWS_SUCCESS');
export const fetchReviewsError = createAction('FETCH_REVIEWS_ERROR');
export const logInRequest = createAction('LOG_IN');
export const logOutRequest = createAction('LOG_OUT');


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
    console.log("Fetch My Items "  + email);
    fetchMyItemsService(email)
      .then((payload) =>
        {
          if (payload != null) {
            dispatch(fetchItemsSuccess(payload));
            console.log(email);
          }
          else {
            dispatch(fetchItemsSuccess([]));
            console.log(email + "EMPTY FUCK");
          }
          console.log("MATE PAYLOAD")
        }
      ).catch((err) => dispatch(fetchItemsError(err)));
  };
}

export function fetchRentedItems(renter) {
  return (dispatch) => {
    console.log("renter: " + renter);
    dispatch(fetchItemsRequest());
    console.log("before fetch service");
    fetchRentedItemsService(renter)
      .then((payload) =>
        {
          if (payload != null) {
            console.log("Not null");
            dispatch(fetchItemsSuccess(payload));
          }
          else {
            console.log("null");
            dispatch(fetchItemsSuccess([]));
          }
        }
      )
      .catch((err) => {
        dispatch(fetchItemsError(err));
        console.log("Error");
      });
  };
}

export function updateRentedItem(item_id){
  return (dispatch) => {
    updateRentedItemService(item_id);
  };
}

export function createTransaction(item_id, renter, duration){
  return (dispatch) => {
    createTransactionService(item_id, renter, duration);
    dispatch(fetchItems());
  };
}

export function postItem(item, successCB, errorCB) {
  return (dispatch) => {
    console.log(item.owner + " owner");
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
        Actions.pop();
      })
      .catch((err) => {
        alert(err + "\nPlease try again briefly.");
        Actions.pop();
      });
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