import { systemmanageType } from '../constants/actionTypes';
import { message } from 'antd';
import ajax from '../../api/systemmanage';
export const systemmanageAction = {
     getTree(v) {
      return dispatch=>{
        ajax.getTree(v).then(res=>{
          const { success,data, message } = res;
          if (success) {     
              dispatch({
                type:systemmanageType.GET_TREE,
                payload:data
              })
            }
          }
        )
      }
    }, 
  
    getRoleTableData (v) {
      return dispatch => {
        ajax.getRoleTableData(v).then(res => {
          const { success,data, message } = res;
          if (success) {   
            dispatch({
              type:systemmanageType.ROLE_TABLE,
              payload: data.data
            });
          dispatch({
            type:systemmanageType.SET_PAGE,
            payload:{total:data.total}
          });
          }
        })
      }
    },
   
     getRoleEntity(v){ //获取角色管理下的实体权限列表 需roleId
      return dispatch=>{
        ajax.getRoleEntity(v).then(res=>{
          const { success,data, message } = res;
          if (success) {   
            dispatch({
              type:systemmanageType.GET_ROLE_ENTITY,
              payload:data
            })
          }
        }
      )
      }
    }, 
    getReferEntity(v){ //获取角色管理下的实体权限列表 需roleId
      return dispatch=>{
        ajax.getReferEntity(v).then(res=>{
          const { success,data, message } = res;
          if (success) {   
            dispatch({
              type:systemmanageType.GET_REFER_ENTITY,
              payload:data
            })
          }
        }
      )
      }
    },
    getAttr(v){
      return dispatch=>{
        ajax.getAttr(v).then(res=>{
          const { success,data, message } = res;
          if (success) {   
            dispatch({
              type:systemmanageType.GET_ENTITY_ATTR,
              payload:data
            })
          }
        })
      }
    },

    setPager: (v)=>{
      return {
        type:systemmanageType.SET_PAGE,
        payload:v
      }
    },
    addRole: (v)=>{
      if(v){
        return dispatch=>{
          ajax.addRole(v).then(res=>{
            const { success,data, message } = res;
            if (success) { 
              dispatch({
                type:systemmanageType.EDIT_ROLE,
                payload:v
              })
            }
          })
        }
      }else{
        return dispatch=>
          dispatch({
            type:systemmanageType.EDIT_ROLE,
            payload:null
        })
      }
    }, 
 /*    saveCategory: (v)=>{
      return dispatch=>{
        ajax.saveCategory(v).then(res=>{
          const { success,data, message } = res;
          if (success) {   
              message.success(message)          
          }
        }
      )
  
      }
    }, */
  
  
   /*  deleteCategory: (v)=>{
      return dispatch=>{
        ajax.deleteCategory(v).then(res =>{
          res?(res.success?message.success(res.message) : message.warn(res.message)):message.error(`请求出错了`)  
        })
      }
    }, */
    getUserTableData (v) {
      return dispatch => {
        ajax.getTableData(v).then(res => {
          const { success,data, message } = res;
          if (success) {   
            dispatch({
              type:systemmanageType.GET_TABLE,
              payload: data.data
            });
          dispatch({
            type:systemmanageType.SET_PAGE,
            payload:{total:data.total}
          });
          }
        })
      }
    },
  }
  
