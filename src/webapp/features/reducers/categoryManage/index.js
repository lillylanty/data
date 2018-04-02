import { combineReducers } from 'redux';
import assign from 'object-assign';
import { categoryManageType } from '../../constants/actionTypes';
const initialState = {
  categoryManageData: []
};
export const categoryManageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
      case categoryManageType.GET_CATEGORYMANAGE_DATA:
      return Object.assign({}, state, {
        categoryManageData: payload,
      });
    default:
      return state;
  }
};
