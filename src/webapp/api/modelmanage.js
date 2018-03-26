import http from '../utils/http'
import apiUrl from '../features/constants/apis';

export default {
  /* 模型管理主页api  */
  getTree: (params)=>{
    return http.get(apiUrl.getTree,params)
  },
  getTabelData: (params)=>{
    return http.get(apiUrl.getTree,params)
  },
  deleteData :(v) =>{
    return http.deleteByObj(apiUrl.deleteData,v) //apiUrl.deleteData //'http://172.16.8.253:8899/api/v1/entity/del'
  },

  /* 新建模型api  */
  getCategory: (params)=>{
    return http.get(apiUrl.getCategory,params)
  },
  postModel:(p)=>{
    return http.post(apiUrl.postModel, params);
  },
  getTableData(p){
    return http.post(apiUrl.getTableData, params);
  },

};