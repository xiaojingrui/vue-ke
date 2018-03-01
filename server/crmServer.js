const express = require('express')
var path = require('path')
const history = require('connect-history-api-fallback') //去掉#号
const crm = require('./serverjs/crm') //过河兵接口
const xxx = require('./serverjs/xxx') //api接口
const bodyParser = require('./serverjs/my-body-parser')

const port = 8888
let app = express()
let getUserInfo
let cookieObject = {}
app.use(history())
//接口转换
app.use(bodyParser.params())
//判断用户是否登录
app.use(function(req, res, next) {
  getUserInfo = undefined
  cookieObject = {}
  bodyParser.getCookies(req, content => {
    cookieObject = content
  })
  if (!cookieObject.access_token || cookieObject.token != undefined) {
    if (!cookieObject.access_token) {
      xxx.getToken(token => {
        //匿名登录 往前台种植token
        res.cookie('access_token', token.data.data)
        next()
      })
    }
    if (cookieObject.token != undefined) {
      xxx.getAuthObject(cookieObject, content => {
        getUserInfo = content.data.data
        res.cookie('userName', getUserInfo.userName)
        next()
      })
    }
  } else {
    next()
  }
})
//过河兵
app.use('/crm/crmlogin', (req, res) => {
  crm.login(getUserInfo, cookieObject, content => {
    let data = content.data
    res.json(data)
  })
})
//拍拍贷
//获取推荐问题列表
app.use('/xxx/getRecommendQAList', (req, res) => {
  let clientData = req.body
  xxx.getRecommendQAList(clientData, getUserInfo, content => {
    let data = content.data
    res.json(data)
  })
})
//客服评价记录
app.use('/xxx/insertCsEvaluate', (req, res) => {
  let clientData = req.body
  xxx.insertCsEvaluate(clientData, getUserInfo, content => {
    let data = content.data
    res.json(data)
  })
})
//问题评价记录
app.use('/xxx/insertQaEvaluate', (req, res) => {
  let clientData = req.body
  xxx.insertQaEvaluate(clientData, getUserInfo, content => {
    let data = content.data
    res.json(data)
  })
})
//调机器人问答接口
app.use('/xxx/callRobotQA', (req, res) => {
  let clientData = req.body
  xxx.callRobotQA(clientData, getUserInfo, content => {
    let data = content.data
    res.json(data)
  })
})

app.use(express.static(path.join(__dirname, './web/')))
module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
