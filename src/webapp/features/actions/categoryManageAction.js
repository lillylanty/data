import { categoryManageType } from '../constants/actionTypes';
import { message } from 'antd';
import ajax from '../../api/global';
export const categoryManageAction = {
  getbigCamelData() {
    return dispatch => {
      ajax.getbigCamelData().then(res => {
        const { data, result, result_code, result_message } = res;
        if (result) {
          dispatch({
            type: categoryManageType.GET_CATEGORYMANAGE_DATA,
            payload: data
          });
        } else {
          message.error(result_message);
        }
      })
    }
  }
}
