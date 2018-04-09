import 'whatwg-fetch'
import { reqHeader, authBeforeRes, authAfterRes } from '../interceptor'
import ProgressBar from '../features/components/progress-bar';
class Http {
  get(url, params) { // GET请求
  //  console.log(url,params)
    let options = { method: 'GET' }
    let req_url = params ? this.buildUrl(url, params) : url;
    return this.request(req_url, options)
  }

  post(url, data) { // POST请求
    
    let options = { method: 'POST', headers: { "content-type": "application/json;charset=UTF-8" } }
    // let options = { method: 'POST' }
    if (data) options.body = typeof data !=='string' ? JSON.stringify(data) :  data
    return this.request(url, options)
  }
  //参数时对象的形式的delete请求 http://172.16.10.144:8899/api/v1/entity/del/{id:1}
  deleteByObj(url,params){
    let options = { method: 'DELETE' }
    if(Object.prototype.toString.call(params) !== "[object Object]" ){
      return message.error('传入的参数不是对象形式')
    }
    let del_url = `${url}/${params.id}`
    return this.request(del_url, options)
  }

  delete(url, params) { // delete请求
    let options = { method: 'DELETE' }
    let req_url = params ? this.buildUrl(url, params) : url;
    return this.request(req_url, options)
  }

  put(url, data) {
    let options = { method: 'PUT' }
    if (data) options.body = JSON.stringify(data)
    return this.request(url, options)
  }

  postForm(url, data, flag) {
    let options = { method: 'POST' }
    if (data) options.body = flag ? this.buildFormData(data) : new FormData(data);
    return this.request(url, options)
  }
  head(url) {
    let options = { method: 'Head' }
    return this.request(url, options)
  }

  request(url, options) {
    options.headers = options.headers || reqHeader;
    options.credentials = 'same-origin'
    ProgressBar.show();
    return fetch(url, options)
      .then(authBeforeRes)
      .then(response => {
        ProgressBar.hide();
        return response.json()
      })
      .then(authAfterRes)
      .catch(err => {
        console.error(url + ":" + err)
      })
  }

  buildUrl(url, params) { // URL构建方法
    const ps = []
    if (params) {
      for (let p in params) {
        if (p) {
          ps.push(p + '=' + encodeURIComponent(params[p]));
        }
      }
    }
    return url + '?' + ps.join('&')
  }

  buildFormData(params) {
    if (params) {
      const data = new FormData()
      for (let p in params) {
        if (p) {
          data.append(p, params[p])
        }
      }
      return data;
    }
  }
}
export default new Http()
