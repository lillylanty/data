import { manageModeleType } from '../constants/actionTypes';
import { message } from 'antd';
import ajax from '../../api/modelmanage';
export const ModelManageAction = {
  getTabelData(v) {
    return dispatch => {
      ajax.getTabelData(v).then(res => {
        const { data, result, result_code, result_message } = res;
        if (result) {
          dispatch({
            type: manageModeleType.GET_TABLE_DATA,
            payload: data
          });
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
            type: manageModeleType.GET_TREE,
            payload: data
          });
        } else {
          message.error(result_message);
        }
      })
    }
    
  },
}


