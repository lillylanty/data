import { combineReducers } from 'redux';
import assign from 'object-assign';
import { newModelType } from '../../constants/actionTypes';
const initialState = {
  modelData:{}, //保存表单的字段
  entityModalAttr:[], //保存正在编辑的table属性
  allData:{}, //表单和table拼接的数据 待上传的数据
  category:null,
  entity:null,
  canNext:false, //判断能否进行下一步
  relObj:[], //实体引用下拉选项,
  enumObj:[], //枚举选项
  codeObj:[], //编码规则选项,
  uploadResult:false, //上传结果
};
export const newModelReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
      case newModelType.SAVE_NEW_ENTITY: //新建的完整数据
        return {...state,allData:payload};

      case newModelType.EDIT_MODEL_DATA: 
        if(payload.entityCode === state.modelData.entityCode){ //对同一个编辑
          return {...state,modelData:{...state.modelData,...payload}};
        }else {
          return {...state,modelData:payload}
        }

      case newModelType.GET_GATEGORY: 
        return {...state,category:payload};
      
      case newModelType.EDIT_ENTITY:
        return {...state,entity:payload};

      case newModelType.EDIT_ENTITY_MODAL_ATTR:     
        return {...state,entityModalAttr:payload};

      case newModelType.CAN_NEXT:
        return {...state,canNext:!state.canNext};

      case newModelType.UPDATE_DATA_TYPE:
      //三种复杂类型
        if(payload.type === 'rel'){
          return {...state,relObj:payload.data}; 
        }else if(payload.type === 'code'){
          
          return {...state,codeObj:payload.data}; 
        }else if(payload.type === 'enum') {
          
          return {...state,enumObj:payload.data}; 
        }

      case newModelType.UPLOAD_MODEL_RESULT:
        return {...state,uploadResult:payload}

    default:
      return state;
  }
};
