import http from '../utils/http'
import apiUrl from '../features/constants/apis';

export default {
  /* 模型管理主页api  */
  getTree: (p)=>{
    return http.get(apiUrl.getTree,p)
  },
  getTabelData: (p)=>{
    return http.post(apiUrl.getTableData,p)
  },
  deleteData :(v) =>{
    return http.deleteByObj(apiUrl.deleteData,v) //apiUrl.deleteData //'http://172.16.8.253:8899/api/v1/entity/del'
  },

  /* 新建模型api  */
  getCategory: (p)=>{
    return http.get(apiUrl.getCategory,p)
  },
  postModel:(p)=>{
    return http.post(apiUrl.postModel, p);
  },
  getTableData(p){
    return http.post(apiUrl.getTableData, p);
  },
  getDataType(p){ //引用数据类型下拉选项
    return http.get(apiUrl.getDataType, p);
  },
  saveEntity(p){
    return http.post(apiUrl.saveEntity, p)
  }

};