import { combineReducers } from 'redux';
import assign from 'object-assign';
import { homeType } from '../../constants/actionTypes';
const initialState = {
  homeData: [],
  tableData:[],
  filterData:[],
  pager:{page:1,pageSize:5,total:0}
};
export const homeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case homeType.GET_TABLE_DATA:
      return {...state,tableData:payload.data,pager:{...state.pager,page:payload.page,total:payload.total,pageSize:payload.pageSize}};
    case homeType.GET_NEXT_PAGE:
      return {...state,tableData:payload};
    case homeType.GET_FILTER:
      return {...state,filterData:payload};

    case homeType.SET_PAGER:
      return {...state,pager:payload};

    case homeType.GET_HOME_DATA:
      return Object.assign({}, state, {
        homeData: payload,
      });
      case homeType.GET_USER_DATA:
      return Object.assign({}, state, {
        userData: payload,
      });
      case homeType.GET_NAV_DATA:
      return Object.assign({}, state, {
        navData: payload,
      });
    default:
      return state;
  }
};
