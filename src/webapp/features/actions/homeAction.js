import { homeType } from '../constants/actionTypes';
import { message } from 'antd';
import ajax from '../../api/home';

export const homeAction = {
  //切换为待我审批或我已审批表
   getFilterData: (v) => {
    if(v && Object.prototype.toString.call(v) =="[object Object]" ){
      if(v.type == 'awaitJudge'){
        return dispatch =>{
          ajax.getAwaitJudgeData(v).then((res) => {
            const { data, result, result_code, result_message } = res;
            console.log(data)
            if(result) {
              dispatch({
                type:homeType.GET_FILTER,
                payload: data
              });
            }else {
              message.error(result_message);
            }
          })
        }
      }else if(v.type == 'judged'){
        return dispatch =>{
          ajax.getFinishedJudgeData(v).then((res) => {
            const { data, result, result_code, result_message } = res;
            if(result) {
              dispatch({
                type:homeType.GET_FILTER,
                payload: data
              });
            }else {
              message.error(result_message);
            }
          })
        }
      }
    }
   },

  getTableData: (v) => {  
    return dispatch =>{
      ajax.getTableData(v).then((res) => {
        const { data, result, result_code, result_message } = res; //data要包含data:[],total:100,page:1,pageSize（每页显示多少条）等信息
        if(result) {
          dispatch({
            type:homeType.GET_TABLE_DATA,
            payload: data
          });
        }else {
          message.error(result_message);
        }
      })
    }

  
    
  },
  setPager : (value) => {
    return {
          type: homeType.SET_PAGER,
          payload:value
      }
  },
  
}



