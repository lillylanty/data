import http from '../utils/http'
let urls = {
  getRoleTableData:'/api/v1/role/list',
  addRole:'/api/v1/role/add',
  addRoleAutority:'/api/v1/role/add-entity-permission',
  deleteRole: '/api/v1/role',
  getTree:'/api/v1/permission/tree',
  // getRoleEntity:'/api/v1/role/entity',  //？角色与实体权限的关联关系
  deleteRoleEntity:'/api/v1/role/entity',  //删除角色与实体权限的关联关系
  getRoleAuthorityEntity:'/api/v1/role/entity/auto-complete', //角色-实体权限关联时检索实体
  selectAutorityList:'/api/v1/role/list-entity-permission', //查询角色关联的实体权限列表
  getReferEntity:'/api/v1/entity/rele-entity',//关联实体
  getAttr: '/api/v1/entity/attr',  //根据id获取实体属性

  deleteUser:'/api/v1/user',
  validUser:'/api/v1/user/auto-complete', //添加用户时自动提示(已添加用户不提示)
  getUserTableData:'/api/v1/user/list',
  getUserRoleList: '/api/v1/user/list-roles' ,
    
}
export default {
  
  getRoleTableData(p) {
    return http.get(urls.getRoleTableData, p);
  },
  getTree(p) {
    return http.get(urls.getTree, p);
  },
  getRoleEntity(p){
    return http.get(urls.getRoleAuthorityEntity,p)
  },
  getCategorySelect(){
    return http.get(urls.getCategorySelect)
  },
  addRole(p){
    return http.post(urls.addRole,p)
  },
  addRoleAutority(p){
    return http.post(urls.addRoleAutority,p)
  },
  getReferEntity(p){
    return http.get(urls.getReferEntity,p)
  },
  getAttr(p){
    return http.get(urls.getAttr,p)
  },
  getUserTableData(p){
    return http.get(urls.getUserTableData,p)
  },
  deleteUser(p){
    return http.deleteByObj(urls.deleteUser,p)
  },
  getUserRoleList(p){
    return http.get(urls.getUserRoleList,p);
  },

  
  
  deleteRole(p){
    return http.deleteByObj(urls.deleteRole,p)
  },
  deleteRoleEntity(p){
    return http.deleteByObj(urls.deleteRoleEntity,p)
  },
  getCodeDetail(p){
    return http.get(urls.getCodeDetail,p)
  }
};