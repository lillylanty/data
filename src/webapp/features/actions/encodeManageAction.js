import { encodeManageType } from '../constants/actionTypes';
import { message } from 'antd';
import ajax from '../../api/global';
export const encodeManageAction = {
  getbigCamelData() {
    return dispatch => {
      ajax.getbigCamelData().then(res => {
        const { data, result, result_code, result_message } = res;
        if (result) {
          dispatch({
            type: encodeManageType.GET_ENCODEMANAGE_DATA,
            payload: data
          });
        } else {
          message.error(result_message);
        }
      })
    }
  }
}
