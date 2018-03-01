const express = require('express')
var path = require('path')
const history = require('connect-history-api-fallback') //去掉#号
const crm = require('./crm') //过河兵接口
const xxx = require('./xxx') //api接口
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const port = 8888
let app = express()
let userInfo = {}
let access_token = ''
app.use(history())

// 参数转换
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 解析http请求的cookies
app.use(cookieParser())

let initUser = async (req, res) => {
  let cookieObject = req.cookies

  // 第一次请求进来初始化access_token和userInfo
  if (!cookieObject.userId || !cookieObject.access_token) {
    let { data } = await xxx.getToken()
    console.log('create token', data)
    access_token = data
    res.cookie('access_token', access_token)

    // 游客
    let userId = access_token
    let userName = ''
    let type = 'visitor'

    if (cookieObject.token !== undefined) {
      let { data } = await xxx.getAuthObject({ token: cookieObject.token })
      console.log('customer', data)
      if (data.userid !== -1) {
        // 拍拍贷用户
        type = 'customer'
        userId = data.userid
        userName = data.userName
      }
    }
    userInfo = { userId, userName, type }
    res.cookie('userId', userId)
    res.cookie('type', type)
    res.cookie('userName', userName)
  } else {
    let { userId, userName, type } = cookieObject
    userInfo = { userId, userName, type }
  }
}

//判断用户是否登录
app.use(async function(req, res, next) {
  await initUser(req, res)
  next()
})

// 初始化用户信息
app.use('/xxx/initUser', async (req, res) => {
  await initUser(req, res)
  res.json('')
})

//过河兵
app.use('/crm/crmlogin', (req, res) => {
  crm.login(userInfo, content => {
    let data = content.data
    res.json(data)
  })
})

//拍拍贷
//获取推荐问题列表
app.use('/xxx/getRecommendQAList', async (req, res) => {
  let data = await xxx.getRecommendQAList({
    userId: userInfo.userId,
    channel_id: req.body.channel_id
  })
  if (data.data.length) {
    data.data.forEach(item => {
      item.questions = item.questions.map((question, index) => ({ id: index + 1, question }))
    })
  } else {
    data.data = []
  }
  res.json(data)
})

// 获取推荐问题列表／有场景id的情形
app.use('/xxx/getSRqaList', async (req, res) => {
  let { sceneId, channel_id } = req.body
  let data = await xxx.getSRqaList({
    userid: userInfo.userId,
    channel_id,
    scenes_id: sceneId
  })
  res.json(data)
})

//客服评价记录
app.use('/xxx/insertCsEvaluate', async (req, res) => {
  let data = await xxx.insertCsEvaluate({
    userId: userInfo.userId,
    ...req.body
  })
  res.json(data)
})

//问题评价记录
app.use('/xxx/insertQaEvaluate', async (req, res) => {
  let data = await xxx.insertQaEvaluate({
    userId: userInfo.userId,
    ...req.body
  })
  res.json(data)
})

//调机器人问答接口
app.use('/xxx/callRobotQA', async (req, res) => {
  let clientData = req.body
  let data = await xxx.callRobotQA({
    channel_id: parseInt(clientData.channel_id),
    access_token: clientData.access_token || access_token,
    userid: userInfo.userId,
    input_value: clientData.input_value,
    recommend: parseInt(clientData.recommend)
  })
  res.json(data)
})

// 自助查询
app.use('/xxx/autoQuery', async (req, res) => {
  let { type, channel_id } = req.body
  let maps = {
    1: 'getLoanProgress',
    2: 'getBalance',
    3: 'getRepaymentList',
    4: 'getDrawCashStatus'
  }
  let data = await xxx[maps[type]]({
    userId: userInfo.userId,
    type: type,
    channel_id: channel_id
  })
  res.json(data)
})

app.use(express.static(path.join(__dirname, '../web/')))
module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
