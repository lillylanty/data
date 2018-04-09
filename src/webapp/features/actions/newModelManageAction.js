import { newModelType } from '../constants/actionTypes';
import { message } from 'antd';
import ajax from '../../api/modelmanage';
export const newModelManageAction = {
  getCategory : (v)=>{
    return dispatch => {
      ajax.getCategory(v).then(res => {
        const { data, success, code, message } = res;
        if (success) {
          dispatch({
            type: newModelType.GET_GATEGORY,
            payload: data
          });
        } 
        /* else {
          message.error(message);
        } */
      })
    }
  },
  postModel : (v)=>{
    return dispatch => {
      ajax.postModel(v).then(res => {
        const { data, success, code, result_message } = res;
        if (success) {
          dispatch({ //应该为返回长传成功后就可以了
            type: newModelType.UPDATE_MODEL_DATA,
            payload: data
          });
        } 
        /* else {
          message.error(message);
        } */
      })
    }
  },
  //实体上部分字段
  editModal:(v) =>{
    return {
      type:newModelType.EDIT_MODEL_DATA,
      payload:v
    }
  },
  //实体下部分表格 属性字段
  editEntityModelAttr: (v) =>{
    return {
      type:newModelType.EDIT_ENTITY_MODAL_ATTR,
      payload:v
    }
  },

  getRecordAttr: (v)=>{
    return dispatch => {
      ajax.getRecordAttr(v).then(res => {
        const { data, success, message } = res;
        if (success) {
          dispatch({
            type: newModelType.EDIT_ENTITY_MODAL_ATTR,
            payload: data
          })
        } 
      })
    }
  },
  
  getDataType: (v) =>{  //应该改为传对象的形式{type:v,data:data}。有的get需要传参数data
  let t = v;
    return dispatch => {
      ajax.getDataType(v).then(res => {
        const { data, success, code, message } = res;
        if (success) {
          dispatch({ 
            type: newModelType.UPDATE_DATA_TYPE,
            payload: {type:t,data:data}
          });
        } else {
          message.error(v + '类型--' + message);
        }
      })
    }
  },
  saveEntity: (v)=>{
    return dispatch => {
      ajax.saveEntity(v).then(res=> {
        const { data, success, message } = res;
        if (success) {
          dispatch({
            type: newModelType.SAVE_NEW_ENTITY,
            payload:v
          });
          dispatch({
            type: newModelType.UPLOAD_MODEL_RESULT,
            payload:success
          });          
        } else {
          // message.error(message);
          dispatch({
            type: newModelType.UPLOAD_MODEL_RESULT,
            payload:false
          });
        }
      })
    }
  },
  toggleShowTable: (v) =>{
    return {
      type : newModelType.SHOW_TABLE,
      payload: null
    }
  }
}
