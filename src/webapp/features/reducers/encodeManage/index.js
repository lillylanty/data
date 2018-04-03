import { combineReducers } from 'redux';
import assign from 'object-assign';
import { encodeManageType } from '../../constants/actionTypes';
const initialState = {
  tableData: [],
  pager:{pageSize:10,total:0},
  categoryList:[],
  formItems:{},
  codeDetail:{},
};
export const encodeManageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case encodeManageType.GET_CODE_DETAIL:
      return{...state,codeDetail: payload};
      case encodeManageType.GET_TABLE:
        return{...state,tableData: payload};
      case encodeManageType.SET_PAGE: 
        return {...state,pager:{...state.pager,...payload}};
      case encodeManageType.GET_PARENT_CATEGORY:
        return {...state,categoryList:payload}
      case encodeManageType.SET_FORM_ITEM:
        return {...state,formItems:payload}
    default:
      return state;
  }
};
