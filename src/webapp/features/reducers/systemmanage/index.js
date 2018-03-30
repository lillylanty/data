import { combineReducers } from 'redux';
import assign from 'object-assign';
import { systemmanageType } from '../../constants/actionTypes';
const initialState = {
  systemmanageData: []
};
export const systemmanageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
      case systemmanageType.GET_SYSTEMMANAGE_DATA:
      return Object.assign({}, state, {
        systemmanageData: payload,
      });
    default:
      return state;
  }
};
