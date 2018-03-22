import http from '../utils/http'
import apiUrl from '../features/constants/apis';

export default {
  getTree:(params)=>{
    return http.get(apiUrl.getTree,params)
  },
  getbigCamelData(p){
    return http.post(apiUrl.getUserData, params);
  }
};