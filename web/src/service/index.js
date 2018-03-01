// 页面请求方式封装
import axios from 'axios'
import config from './config'
import Vue from 'vue'
// import './mockData'

let _http = axios.create(config)

_http.interceptors.response.use(
  function(response) {
    let { data, config } = response
    const ignoreUrls = ['/xxx/initUser']
    if (!ignoreUrls.includes(config.url)) {
      let isCrmLogin = config.url === '/crm/crmlogin'
      if ((isCrmLogin && data.result !== 1) || (!isCrmLogin && data.errCode !== 0)) {
        Vue.prototype.$message.alert('服务器开小差了，请稍后再试')
        return Promise.reject('服务器开小差了，请稍后再试')
      }
    }
    return data
  },
  function(error) {
    return Promise.reject(error)
  }
)

class Service {
  // 登录
  crmLogin(params) {
    return _http.post('/crm/crmlogin', params)
  }
  // 获取推荐问题列表
  getRecommendQAList(params) {
    return _http.post('/xxx/getRecommendQAList', params)
  }
  // 获取推荐问题列表
  getSRqaList(params) {
    return _http.post('/xxx/getSRqaList', params)
  }
  // 客服评价记录
  insertCsEvaluate(params) {
    return _http.post('/xxx/insertCsEvaluate', params)
  }
  // 问题评价记录
  insertQaEvaluate(params) {
    return _http.post('/xxx/insertQaEvaluate', params)
  }
  // 调机器人问答接口
  callRobotQA(params) {
    return _http.post('/xxx/callRobotQA', params)
  }
  // 自助查询
  autoQuery(params) {
    return _http.post('/xxx/autoQuery', params)
  }
  // 初始化用户信息
  initUser() {
    return _http.post('/xxx/initUser')
  }
}

export default new Service()
