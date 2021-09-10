import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { useHistory } from 'umi'
import { message } from 'antd';

const http = axios.create({
  timeout: 1000,
  baseURL: 'http://localhost:7001'
})

//请求拦截
http.interceptors.request.use((config: AxiosRequestConfig) => {
  let token = localStorage.getItem('token')
  if (token) {
    // headers属性是后端约定的
    config.headers['Authorization'] = token
  }
  return config
}, (err: AxiosError) => {
  return Promise.reject(err)
})

//响应拦截
http.interceptors.response.use((res: any) => {
  return res.data
}, (err: AxiosError) => {
  let status: number = err.response! && err.response!.status
  switch (status) {
    case 400:
      message.error('参数错误', 1)
      break;
    case 401:
      message.error('登录时间过长,请重新登录', 1)
     setTimeout(()=>{
      window.location.pathname='/login'
     },1000)
      break;
    case 403:
      message.error('没有权限', 1)
      break
    case 404:
      message.error('路径错误', 1)
      break
    case 500:
      message.error('服务器错误', 1)
      break
    case 503:
      message.error('服务器维护', 1)
      break;
  }
  return Promise.reject(err)
})


export default http