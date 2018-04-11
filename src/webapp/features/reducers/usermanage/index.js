import { combineReducers } from 'redux';
import assign from 'object-assign';
import { usermanageType } from '../../constants/actionTypes';
const initialState = {
  userTable: null,
  pager:{pageSize:10,total:0},
  validuser:[]
};
export const usermanageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case usermanageType.GET_TABLE:
	    return {...state,userTableData: [...payload]};
    case usermanageType.SET_PAGE: 
    	return {...state,pager:{...state.pager,...payload}};
    case usermanageType.GET_ROLE:
      return {...state,roles:[...payload.data]};
    case usermanageType.VALID_USER:
      return {...state,validuser:[...payload.data]};
    default:
      return state;
  }
};