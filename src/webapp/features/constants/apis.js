import {baseUrl} from './env'; 

console.log(baseUrl);

export default {
  /*---------------------home---------------------------*/
  getHomeData: '/homeData.json', // 获取总览数据
  getUserData: '/userData.json',      // 获取appname panel面板数据
  getNavData: '/navData.json',
  getMyRequestData: '/myRequest.json',
  getAwaitJudgeData: '/awaitJudge.json',
  getFinishedJudgeData:'/finishedJudge.json',

  /*----------model--------------*/
  getTree: '/modelTree.json',
  deleteData: '/api/v1/entity/del',
  getTable: `/api/v1/entity/list`,
  
}
