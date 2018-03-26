import { manageModelType } from '../constants/actionTypes';
import { message } from 'antd';
import ajax from '../../api/modelmanage';
export const ModelManageAction = {
  getTableData(v) {
    return dispatch => {
      ajax.getTabelData(v).then(res => {
        const { data, success, result_code, result_message } = res;
        if (success) {
          dispatch({
            type: manageModelType.GET_TABLE_DATA,
            payload: data.data
          });
          dispatch({
            type:manageModelType.SET_PAGE,
            payload:{page:data.page,total:data.total}
          })
        } else {
          message.error(result_message);
        }
      })
    }
  },
  getTree : (v)=>{
    return dispatch => {
      ajax.getTree(v).then(res => {
        const { data, result, result_code, result_message } = res;
        if (result) {
          dispatch({
            type: manageModelType.GET_TREE,
            payload: data
          });
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
            type: manageModelType.GET_TABLE_DATA,
            payload: data
          });
          message.success(message)
        } else {
          message.error(message);
        }
      })
    }
    
  },
}


