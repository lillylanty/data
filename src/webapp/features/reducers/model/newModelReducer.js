import { combineReducers } from 'redux';
import assign from 'object-assign';
import { newModelType } from '../../constants/actionTypes';
const initialState = {
  modelData:{},
  category:null,
  entity:null,
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

      // case newModelType.SET_NEW_DATA:
      //   return {...state,newData:payload};

    default:
      return state;
  }
};
