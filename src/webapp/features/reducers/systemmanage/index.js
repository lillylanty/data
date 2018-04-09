import { combineReducers } from 'redux';
import assign from 'object-assign';
import { systemmanageType } from '../../constants/actionTypes';
const initialState = {
  roleTable: null,
  pager:{pageSize:10,total:0},
  roleEntity:[],
  formItems:null,
  tree:null,
  role:null, //和tree相关联
  referEntity:null, //实体权限——关联实体
  attr: null, //添加实体权限下的选择实体后，根据实体id获取属性权限表格左边两列实体属性（属性、字段名）
};
export const systemmanageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
      case systemmanageType.ROLE_TABLE:
      return Object.assign({}, state, {
        roleTable: payload,
      });
      case systemmanageType.GET_TREE:
        return{...state,tree: payload};

      case systemmanageType.EDIT_ROLE:
        return{...state,role: payload};
      // case systemmanageType.USER_TABLE:
      //   return{...state,tableData: payload};
      case systemmanageType.SET_PAGE: 
        return {...state,pager:{...state.pager,...payload}};
      case systemmanageType.GET_ROLE_ENTITY:
      console.log(state.roleEntity)
        return {...state,roleEntity:payload};

      case systemmanageType.GET_REFER_ENTITY:
        return {...state,referEntity:payload};

      case systemmanageType.GET_ENTITY_ATTR:
        return {...state,attr:payload};

       
      case systemmanageType.SET_FORM_ITEM:
        return {...state,formItems:payload}
    default:
      return state;
  }
};
