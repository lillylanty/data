// import http from './http';
import http from '../utils/http'
import apiUrl from '../features/constants/apis';

export default {
  getTableData(params){
    return http.get(apiUrl.getMyRequestData, params)
  },
  getAwaitJudgeData(params){
    return http.get(apiUrl.getAwaitJudgeData, params)
  },
  getFinishedJudgeData(params){
    return http.get(apiUrl.getFinishedJudgeData, params)
  }
};
