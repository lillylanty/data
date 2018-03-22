import { combineReducers } from 'redux';
import assign from 'object-assign';
import { manageModeleType } from '../../constants/actionTypes';
const initialState = {
  tree: [],
  tableData:[],
  pager:{},
  newData:[],
  filterData:[]
};
export const modelReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
      case manageModeleType.GET_TREE:
      return Object.assign({}, state, {
        tree: payload,
      });

      case manageModeleType.GET_TABLE_DATA: 
        return {...state,tableData:payload};
      
      case manageModeleType.GET_FILTER_DATA:
        return {...state,filterData:payload};

      case manageModeleType.SET_NEW_DATA:
        return {...state,newData:payload};

    default:
      return state;
  }
};
