import { manageModelType } from '../constants/actionTypes';
import { message } from 'antd';
import ajax from '../../api/modelmanage';
export const ModelManageAction = {
  getTableData(v) {
    return dispatch => {
      ajax.getTabelData(v).then(res => {
        const { success,data, message } = res;
        if (success) {
          
          dispatch({
            type: manageModelType.GET_TABLE_DATA,
            payload: data.data
          });
        dispatch({
          type:manageModelType.SET_PAGE,
          payload:{total:data.total}
        });
         
          
        } else {
          message.error(message);
        }
      })
    }
  },

  getTree : (v)=>{
    return dispatch => {
      ajax.getTree(v).then(res => {
        const { success,data, message } = res;
        if (success) {
          dispatch({
            type: manageModelType.GET_TREE,
            payload: data
          });
        } else {
          message.error(message);
        }
      })
    }
    
  },
  deleteData : (v)=>{
    return dispatch => {
      ajax.deleteData(v).then(res => {
        const { data, success, message } = res;
        if (success) {
          this.getTabelData()
          message.success(message)
        } else {
          message.error(message);
        }
      })
    }
    
  }
}




/**
 * dispatch({
            type: manageModelType.GET_TABLE_DATA,
            payload: data
          });
*/


