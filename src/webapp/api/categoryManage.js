import http from '../utils/http'
export let urls = {
  getTableData:'/api/v1/entity-group/list',
  getCategorySelect:'/api/v1/entity-group/list-all',
}

export default {
  getTableData(params) {
    return http.post(urls.getTableData, params);
  },
  getCategorySelect(){
    return http.get(urls.getCategorySelect)
  }
};