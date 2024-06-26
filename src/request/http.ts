/**
 * 网络请求配置
 */
import axios from 'axios'

export interface responseType {
  code: number
  data: any
  msg: string
}

export const BASEURL = 'http://8.134.48.185/'

axios.defaults.timeout = 100000
axios.defaults.baseURL = BASEURL

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    // config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/json',
      Authorization: token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error.response.data)
  }
)

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url: string, params = {}) {
  return new Promise<responseType>((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then((response) => {
        landing(url, params, response.data)
        resolve(response.data)
      })
      .catch((error) => {
        reject(error.data)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url: string, data: any) {
  return new Promise<responseType>((resolve, reject) => {
    axios
      .post(url, data)
      .then((response) => {
        //关闭进度条
        resolve(response.data)
      })
      .catch((error) => {
        reject(error.data)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url: string, data = {}) {
  return new Promise<responseType>((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response.data)
      },
      (err) => {
        msag(err)
        reject(err)
      }
    )
  })
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url: string, data = {}) {
  return new Promise<responseType>((resolve, reject) => {
    axios
      .delete(url, data)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error.data)
      })
  })
}

//统一接口处理，返回数据
export default function (fecth, url, param) {
  const _data = ''
  return new Promise((resolve, reject) => {
    switch (fecth) {
      case 'get':
        console.log('begin a get request,and url:', url)
        get(url, param)
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            console.log('get request GET failed.', error)
            reject(error)
          })
        break
      case 'post':
        post(url, param)
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            console.log('get request POST failed.', error)
            reject(error)
          })
        break
      default:
        break
    }
  })
}

//失败提示
function msag(err: any) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        alert(err.response.data.error.details)
        break
      case 401:
        alert('未授权，请登录')
        break

      case 403:
        alert('拒绝访问')
        break

      case 404:
        alert('请求地址出错')
        break

      case 408:
        alert('请求超时')
        break

      case 500:
        alert('服务器内部错误')
        break

      case 501:
        alert('服务未实现')
        break

      case 502:
        alert('网关错误')
        break

      case 503:
        alert('服务不可用')
        break

      case 504:
        alert('网关超时')
        break

      case 505:
        alert('HTTP版本不受支持')
        break
      default:
    }
  }
}

/**
 * 查看返回的数据
 * @param url
 * @param params
 * @param data
 */
function landing(url, params, data) {
  if (data.code === -1) {
  }
}
