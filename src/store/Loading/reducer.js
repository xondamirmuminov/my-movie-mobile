import * as types from './actionTypes';

const initialState = {
  loading: false,
};

export default (state = initialState, action) => {
  if (action.type === types.LOADING) {
    return {
      ...state,
      loading: action.payload,
    };
  } else {
    return state;
  }
};
