import { combineReducers } from 'redux';
import assign from 'object-assign';
import { newModelType } from '../../constants/actionTypes';
const initialState = {
  modelData:{},
  category:null,
  entity:null,
  displayTable:false,
  relObj:[], //实体引用下拉选项
};
export const newModelReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
      case newModelType.EDIT_MODEL_DATA: 
        return {...state,modelData:payload};

      case newModelType.GET_GATEGORY: 
        return {...state,category:payload};
      
      case newModelType.EDIT_ENTITY:
        return {...state,entity:payload};

      case newModelType.SHOW_TABLE:
        return {...state,displayTable:!state.displayTable};

      case newModelType.UPDATE_DATA_TYPE:
        return {...state,relObj:payload};   
    default:
      return state;
  }
};
