import { categoryManageType } from '../constants/actionTypes';
import { message } from 'antd';
import ajax from '../../api/categoryManage';
export const categoryManageAction = {
  getTableData (v) {
    return dispatch => {
      ajax.getTableData(v).then(res => {
        const { success,data, message } = res;
        if (success) {   
          dispatch({
            type: categoryManageType.GET_TABLE,
            payload: data.data
          });
        dispatch({
          type:categoryManageType.SET_PAGE,
          payload:{total:data.total}
        });
        }
        /* else{
          message.error(message)
        } */
      })
    }
  },
  getPrentCategory(v){
    return dispatch=>{
      ajax.getCategorySelect().then(res=>{
        const { success,data, message } = res;
        if (success) {   
       
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
  },
  setFormItems: (v)=>{
    return {
      type: categoryManageType.SET_FORM_ITEM,
      payload:v
    }
  },
  saveCategory: (v)=>{
    return dispatch=>{
      ajax.saveCategory(v).then(res=>{
        const { success,data, message } = res;
        if (success) {   
            message.success(message)          
        }
       /*  else{
          message,error(message)
        } */
      }
    )

    }
  },


  deleteCategory: (v)=>{
    return dispatch=>{
      ajax.deleteCategory(v).then(res =>{
        res?(res.success?message.success(res.message) : message.warn(res.message)):message.error(`请求出错了`);
       /*  dispatch({
            type: categoryManageType.GET_TABLE,
            payload: data.data
          });
        dispatch({
          type:categoryManageType.SET_PAGE,
          payload:{total:data.total}
        }); */

      })
    }
  }
}
