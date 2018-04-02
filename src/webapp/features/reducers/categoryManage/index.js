import { combineReducers } from 'redux';
import assign from 'object-assign';
import { categoryManageType } from '../../constants/actionTypes';
const initialState = {
  tableData: [],
  pager:{pageSize:10,total:0},
  categoryList:[],
};
export const categoryManageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
      case categoryManageType.GET_TABLE:
      console.log(action)
      return{...state,tableData: payload};
      case categoryManageType.SET_PAGE: 
        return {...state,pager:{...state.pager,...payload}};
      case categoryManageType.GET_PARENT_CATEGORY:
        return {state,categoryList:payload}

    default:
      return state;
  }
};
