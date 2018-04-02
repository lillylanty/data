import { combineReducers } from 'redux';
import assign from 'object-assign';
import { encodeManageType } from '../../constants/actionTypes';
const initialState = {
  encodeManageData: []
};
export const encodeManageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
      case encodeManageType.GET_ENCODEMANAGE_DATA:
      return Object.assign({}, state, {
        encodeManageData: payload,
      });
    default:
      return state;
  }
};
