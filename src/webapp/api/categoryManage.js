import http from '../utils/http'
let urls = {
  getTableData:'/api/v1/entity-group/list',
  getCategorySelect:'/api/v1/entity-group/list-all',
  saveCategory: '/api/v1/entity-group/save' ,
  deleteCategory: '/api/v1/entity-group/del',
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
  }
};