import { categoryManageType } from '../constants/actionTypes';
import { message } from 'antd';
import ajax from '../../api/categoryManage';
export const categoryManageAction = {
  getTableData (v) {
    return dispatch => {
      ajax.getTableData(v).then(res => {
        const { success,data, message } = res;
        if (success) {   
          console.log(res) 
          dispatch({
            type: categoryManageType.GET_TABLE,
            payload: data.data
          });
        dispatch({
          type:categoryManageType.SET_PAGE,
          payload:{total:data.total}
        });
        }else{
          message.error(message)
        }
      })
    }
  },
  getPrentCategory(v){
    return dispatch=>{
      ajax.getCategorySelect().then(res=>{
        const { success,data, message } = res;
        if (success) {   
          console.log(res); 
          dispatch({
            type:categoryManageType.GET_PARENT_CATEGORY,
            payload:data
          })
        }
      }
    )
    }
  },

  setPager: (v)=>{
    return {
      type: categoryManageType.SET_PAGE,
      payload:v
    }
  }
}
