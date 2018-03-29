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
  getDataType(p){ //复杂类型下拉选项
    switch(p){
      case 'rel': 
       return http.get(apiUrl.getrelEntity);
      case 'enum': 
        return http.get(apiUrl.getEnumType,{type:'enum'});
      case 'code':
        return http.get(apiUrl.getCodeType);
      default:
        console.warn(`传入的参数类型有误${p}`);
    }
    
  },
  saveEntity(p){
    return http.post(apiUrl.saveEntity, p)
  },
  getrelEntity(){
    return http.get(apiUrl.getrelEntity)
  },


};