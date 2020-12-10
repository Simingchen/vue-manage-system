import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL + 'witkey-api',
  timeout: 5000
})

// 使用 cancel token 取消请求
// 对每个请求进行标记，并把 cancle 方法储存，如果再次请求中有相同的就取消上一次请求，重新请求
let cancelToken = axios.CancelToken;

// 获取请求标志，对请求队列进行命名
const getRequestMarker = (config) => {
  return encodeURIComponent(config.url + JSON.stringify(config.method === 'get' ? config.params : config.data))
}


// request interceptor
service.interceptors.request.use(
  config => {
    // 获取token
    if (store.getters.token) {
      config.headers['jwt-token'] = getToken()
    }

    // 发送前执行取消操作，把相同的重复请求去除掉，避免短时间重复请求
    config.cancelToken = new cancelToken(cancel => {
      let requestMarker = getRequestMarker(config)
      // 储存 pending 对象 提交到 store 进行记录
      const params = {
        cancel,
        key: requestMarker
      }
      store.commit('axios/add', params)
    })

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // 响应后再执行取消操作，把已经完成的请求从 store 中移除
    let requestMarker = getRequestMarker(response.config)
    store.commit('axios/remove', requestMarker)

    const res = response.data


    return Promise.resolve(res.data || res)

    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// 请求统一参数
const http = {}
const methodList = ['get', 'delete', 'head', 'options', 'post', 'put', 'patch']
methodList.forEach(item => {
  http[item] = function (url, data) {
    const par = {
      method: item,
      url,
      data,
      params: data,
    }
    if (item == 'get' || item == 'delete' || item == 'head' || item == 'options') {
      delete par.data
    } else {
      delete par.params
    }

    return service(par);
  }
})

export default http

Vue.prototype.$http = http

