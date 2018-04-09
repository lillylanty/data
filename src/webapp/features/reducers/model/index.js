import { combineReducers } from 'redux';
import assign from 'object-assign';
import { manageModelType } from '../../constants/actionTypes';
const initialState = {
  tree: [],
  tableData:[],
  pager:{total:0,pageSize:10},
  newData:[],
  filterData:[],
  recordAttr:undefined,
  categoryId:'',
};
export const modelReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case manageModelType.GET_ATTR: 
        return {...state,recordAttr:payload};

      case manageModelType.GET_TREE:
        return Object.assign({}, state, {
          tree: payload,
        });
      case manageModelType.SET_PAGE: 
      // console.log({...state,pager:{...state.pager,...payload}})
        return {...state,pager:{...state.pager,...payload}};

      case manageModelType.GET_TABLE_DATA: 
        return {...state,tableData:payload};
        
        case manageModelType.SET_CATEGORY_ID: 
        console.log(state.categoryId)
          return {...state,categoryId:payload};

   /*    case manageModelType.GET_FILTER_DATA:
        return {...state,categoryId:payload}; */

      case manageModelType.SET_NEW_DATA:
        return {...state,newData:payload};

    default:
      return state;
  }
};
