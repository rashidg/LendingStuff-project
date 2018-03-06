import { createAction } from 'redux-act';

import { fetchItemsService } from './APIService';


export function fetchItems() {
  return (dispatch) => {
    dispatch(fetchItemsRequest());

    fetchItemsService()
      .then((payload) => dispatch(fetchItemsSuccess(payload)))
      .catch((err) => dispatch(fetchItemsError(err)))
  };
}

export const fetchItemsRequest = createAction('FETCH_ITEMS_REQUEST');
export const fetchItemsSuccess = createAction('FETCH_ITEMS_SUCCESS');
export const fetchItemsError = createAction('FETCH_ITEMS_ERROR');