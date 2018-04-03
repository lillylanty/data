import http from '../utils/http'
let urls = {
  getTableData:'/api/v1/code/list',
  getCategorySelect:'/api/v1/entity-group/list-all',
  saveCategory: '/api/v1/code/save' ,
  deleteCategory: '/api/v1/code/del',
  getCodeDetail: '/api/v1/code/get',
  
}
export default {
  getTableData(p) {
    return http.post(urls.getTableData, p);
  },
  getCategorySelect(){
    return http.get(urls.getCategorySelect)
  },
  saveCategory(p){
    return http.post(urls.saveCategory,p)
  },
  deleteCategory(p){
    return http.deleteByObj(urls.deleteCategory,p)
  },
  getCodeDetail(p){
    return http.get(urls.getCodeDetail,p)
  }
};