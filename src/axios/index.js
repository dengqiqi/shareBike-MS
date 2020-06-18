import JsonP from 'jsonp'
import axios from 'axios'
import {Modal} from 'antd';

export default class Axios {
  static jsonp(options) {
    new Promise( (resolve, reject)=>{
      JsonP(options.url, {
        param: 'callback'
      }, function (err, response) {
        if (response.status === 'success') {
          resolve(response);
        } else {
          reject(response.message)
        }
      })
    })
  }

  static ajax(options){
    let loading;
    
    if (options.data && options.data.isShowLoading !== false){
        loading = document.getElementById('ajaxLoading');
        loading.style.display = 'block';
    }
    // const baseUrl = 'https://www.easy-mock.com/mock/5eeb4f5ebc83131fab731d75/mockapi'
    const baseUrl = 'http://rap2.taobao.org:38080/app/mock/258492/'
    
    return new Promise((resolve, reject)=>{
      axios({
        url: options.url,
        method: 'get',
        baseURL: baseUrl,
        timeout: 5000,
        params: (options.data && options.data.params) || ''
      }).then((response)=>{
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading');
          loading.style.display = 'none';
        }
        if (response.status === 200) {
          let res = response.data;
          res.result.map((item, index)=>{
            return item.key = index;
          })

          if (res.code === 0) {
            resolve(res)
          } else {
            Modal.info({
              title: '提示',
              content: res.msg
            })
          }
        } else {
          reject(response.data)
        }
      })
    });
  }
}