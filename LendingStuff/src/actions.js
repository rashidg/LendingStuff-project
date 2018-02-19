import { createAction } from 'redux-act';

import { getDBItems } from './APIService';


export const getData = createAction('FETCHING_DATA');

export const getDataSuccess = createAction('FETCHING_DATA_SUCCESS');

export const getDataFailure = createAction('FETCHING_DATA_FAILURE');

export function fetchData() {
  return (dispatch) => {
    dispatch(getData());
    getDBItems()
      .then((data) => {
        dispatch(getDataSuccess(data))
      })
      .catch((err) => console.log('err:', err))
  };
}