import { newModelType } from '../constants/actionTypes';
import { message } from 'antd';
import ajax from '../../api/modelmanage';
export const newModelManageAction = {
  getCategory : (v)=>{
    return dispatch => {
      ajax.getCategory(v).then(res => {
        const { data, result, code, result_message } = res;
        if (result) {
          dispatch({
            type: newModelType.GET_CATEGORY,
            payload: data
          });
        } else {
          message.error(result_message);
        }
      })
    }
  },
  postModel : (v)=>{
    return dispatch => {
      ajax.postModel(v).then(res => {
        const { data, result, code, result_message } = res;
        if (result) {
          dispatch({ //应该为返回长传成功后就可以了
            type: newModelType.UPDATE_MODEL_DATA,
            payload: data
          });
        } else {
          message.error(result_message);
        }
      })
    }
  },
  editEntityModel: (v) =>{
    return {
      type:newModelType.EDIT_ENTITY,
      payload:v
    }
  },
  toggleShowTable: (v) =>{
    return {
      type : newModelType.SHOW_TABLE,
      payload: null
    }
  }
  /* getTableData(v) {
    return dispatch => {
      ajax.getTabelData(v).then(res => {
        const { data, success, result_code, result_message } = res;
        if (success) {
          dispatch({
            type: manageModeleType.GET_TABLE_DATA,
            payload: data.data
          });
          dispatch({
            type:manageModeleType.SET_PAGE,
            payload:{page:data.page,total:data.total}
          })
        } else {
          message.error(result_message);
        }
      })
    }
  },

  deleteData : (v)=>{
    return dispatch => {
      ajax.deleteData(v).then(res => {
        const { data, success, message } = res;
        if (success) {
          dispatch({
            type: manageModeleType.GET_TABLE_DATA,
            payload: data
          });
          message.success(message)
        } else {
          message.error(message);
        }
      })
    }
    
  }, */
}


