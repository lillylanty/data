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
  getTree: '/api/v1/entity-group/list',
  deleteData: '/api/v1/entity/del',
  getTableData: `/api/v1/entity/list`,
  getRecordAttr: '/api/v1/entity/attr',           //编辑时获取模型属性 id传groupId
  /*----新建模型------*/
  getCategory: `/api/v1/entity-group/list`,
  saveEntity: `/api/v1/entity/save`,         //上传编辑或新增的实体模型
  getrelEntity:'/api/v1/entity/rel-entity',  //实体引用选择 获取关联实体接口
  getEnumType: '/api/v1/dict/list',          // 获取枚举类型
  getCodeType: '/api/v1/code/enum-list',     //获取编码类型接口，建模数据类型下拉框选择编码时请求
  
  

  
}
