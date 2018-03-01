// app应用的全局配置
export default {
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },

  // `withCredentials`指示是否跨站点访问控制请求
  withCredentials: true,
  // 设置超时时间
  timeout: 10000,
  // 返回数据类型
  responseType: 'json' // default
}
