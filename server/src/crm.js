const md5 = require('./md5') //md5加密
const axios = require('axios')
const Crm = {
  login(userInfo, callback) {
    console.log('NODE_ENV', process.env.NODE_ENV)
    // 过河兵测试环境api接口
    let crmUrl = 'http://crmchat.xxx.com:8080/webchat/tpi'
    if (process.env.NODE_ENV === 'production') {
      // 过河兵生产环境api接口
      crmUrl = 'http://crmchat.xxx.com/webchat/tpi'
    }
    let params = {}
    if (userInfo.type === 'customer') {
      //登录加注册，如果有这个用户就直接使用，没有就直接注册一个新的
      params = {
        type: 3,
        loginName: userInfo.userId, //登录名
        name: userInfo.userName, //姓名
        portraitUrl: '', //头像地址
        epid: '' //企业号
      }
    } else {
      //如果是匿名访客登录
      params = {
        type: 4, //匿名访客登录
        visitorId: userInfo.userId, //访客唯一标识guid
        ipAddr: '', //访问请求过来的ip地址
        epid: '' //企业号
      }
    }

    let PUBLIC_KEY = 'ELITE_WEB_CHAT_1612081555'
    let paramsMd5 = md5.md5Encrypt(JSON.stringify(params) + PUBLIC_KEY)
    console.log('url:', crmUrl)
    console.log('data:', params)
    axios
      .post(crmUrl, params, {
        headers: {
          'Content-Type': 'application/json',
          sign: paramsMd5
        }
      })
      .then(res => {
        callback && callback(res)
      })
      .catch(function(error) {
        console.log('crm接口 error', error)
      })
  }
}
module.exports = Crm
