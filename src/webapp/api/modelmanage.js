import http from '../utils/http'
import apiUrl from '../features/constants/apis';

export default {
  getTabelData:(params) => {
    return http.post(apiUrl.getTable,params)
  },
  getTree:(params)=>{
    return http.get(apiUrl.getTree,params)
  },
  getbigCamelData(p){
    return http.post(apiUrl.getUserData, params);
  },
  deleteData :(v) =>{
    return http.deleteByObj(apiUrl.deleteData,v) //apiUrl.deleteData //'http://172.16.8.253:8899/api/v1/entity/del'
  }
};