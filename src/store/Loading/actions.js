import * as actionTypes from './actionTypes';

export const loading = payload => {
  return {
    type: actionTypes.LOADING,
    payload,
  };
};
