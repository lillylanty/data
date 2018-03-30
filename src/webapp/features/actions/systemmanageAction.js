import { systemmanageType } from '../constants/actionTypes';
import { message } from 'antd';
import ajax from '../../api/global';
export const systemmanageAction = {
  getbigCamelData() {
    return dispatch => {
      ajax.getbigCamelData().then(res => {
        const { data, result, result_code, result_message } = res;
        if (result) {
          dispatch({
            type: systemmanageType.GET_SYSTEMMANAGE_DATA,
            payload: data
          });
        } else {
          message.error(result_message);
        }
      })
    }
  }
}
