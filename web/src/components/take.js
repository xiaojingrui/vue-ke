/**
 * msgList数据结构：[{type: String, data: Object, isService: Boolean, currentView: String, isHistoryMsg:Boolean}]
 * type:数据类型,isService:是否是客服,data:渲染组件时用到的数据,currentView:显示的组件名称,isHistoryMsg:是否是历史消息
 * isService:false => type=0 客户发的文本 type=1 客户发的图片
 * isService:true => type=0 客服文本以及推荐问题 type=1 图片 type=2 首次进入客服发出的话 type=3 历史消息的提示
 * type=4 评价回话内容 type=5 转人工的提示 type=6 等待人数的提示 type=7 借款进度 type=8 查询余额 type=9 还款查询 type=10 提现查询
 */

// 转人工的提示
import transHumanHint from './customerService/transHumanHint'
// 客户文本
import customerText from './customer/text.vue'
// 客户／客服图片
import imageMsg from './common/img.vue'
// 评价提示
import evalHint from './customerService/evalHint.vue'
// 评价的弹框
import evaluate from './dialog/evaluate.vue'
// 客服发的文本以及推荐问题
import textAndRecommends from './customerService/text&recommends.vue'
// 历史消息提示分割线
import historyTips from './customerService/historyTips.vue'
// 客服进入第一次说的话
import firstTalk from './customerService/firstTalk.vue'
// 客服推送的排队的提示
import waitHumanHint from './customerService/waitHumanHint.vue'
// 借款进度
import loanProgress from './customerService/loanProgress.vue'
// 查询余额
import queryBalance from './customerService/queryBalance.vue'
// 还款查询
import queryRepay from './customerService/queryRepay.vue'
// 提现查询
import queryCashStatus from './customerService/queryCashStatus.vue'

import { judgeOS, preloadImg } from '@js/utils'
import wsConfig from './wsConfig'
import commonQueries from './commonQueries'

import Cookies from 'js-cookie'
import lrz from 'lrz'
import uploadImg from '@/service/upload'
import { AC_LOGIN_PREFIX } from '@js/const'
export default {
  components: {
    transHumanHint,
    customerText,
    evalHint,
    evaluate,
    textAndRecommends,
    historyTips,
    firstTalk,
    waitHumanHint,
    imageMsg,
    loanProgress,
    queryBalance,
    queryRepay,
    queryCashStatus
  },
  data() {
    return {
      // 对话框当前的组件
      dialogView: '',
      // 对话框是否显示
      dialogVisible: false,
      // 传入对话框组件的参数
      dialogParams: {},
      sendWord: '',
      msgList: [],
      // 是否已转接人工
      isTransedHuman: false,
      historyRecord: [],
      timer: null,
      // 连接ws需要的token
      crmToken: '',
      // 连接ws并成功开启聊天后获取到的sessionId
      sessionId: 0,
      // 连接ws成功后获取到的requestId作为后期沟通的标识
      requestId: '',
      // 开启人工聊天的类型
      type: '',
      channel_id: '',
      isKeyboardBounce: false,
      isIOS: false,
      commonQueries
    }
  },
  computed: {
    paddingBottom() {
      if (this.isIOS && this.isKeyboardBounce) {
        return '80'
      }
      return 0
    }
  },
  beforeRouteLeave(to, from, next) {
    this.isTransedHuman && this.closeWs()
    next()
  },
  async mounted() {
    let customerType = Cookies.get('type')
    let token = Cookies.get('token')
    // 点击自助查询时如未登录 登录完回来更新cookie里的用户信息
    if (token && customerType === 'visitor') {
      this.$httpService.initUser()
    }
    this.channel_id = Number.parseInt(this.$route.query.channel_id)
    // 从localStorage 读取历史消息
    let localMsgList = JSON.parse(localStorage.getItem('localMsgList'))
    if (localMsgList && localMsgList.length) {
      let filteredMsg = localMsgList.filter(item => item.type === 1)
      if (filteredMsg.length) {
        // 预加载所有的图片，为了首次进入滚动条滚到底
        let promises = filteredMsg.map(item => preloadImg(item.data.url))
        await Promise.all(promises)
      }

      this.msgList = localMsgList
      let msg = {
        isService: true,
        type: 3,
        currentView: 'historyTips'
      }
      this.saveInMsgList(msg)
    }
    let msg = {
      isService: true,
      type: 3,
      currentView: 'firstTalk'
    }
    this.saveInMsgList(msg)

    let queryType = this.$route.query.query_type
    if (queryType) {
      this.autoQuery(queryType)
    }

    this.isIOS = judgeOS() === 'ios'
    if (!this.isIOS) {
      // 安卓软键盘弹起时将消息置底
      let clientHeight = document.body.clientHeight
      this.handler = () => {
        let nowClientHeight = document.body.clientHeight
        if (clientHeight > nowClientHeight) {
          this.goToBottom()
        }
      }
      window.addEventListener('resize', this.handler, false)
      this.$refs.sendWordInput.focus()
    }

    this.$nextTick(() => {
      window.app.$on('ask-robot', data => {
        let { text, inStorage } = data
        this.askRobot(text, inStorage)
      })
    })
  },
  destoryed() {
    if (!this.isIOS) {
      // 移除resize事件
      window.removeEventListener('resize', this.handler, false)
    }

    window.app.$off(['ask-robot'])
  },
  watch: {
    msgList() {
      this.goToBottom()
    }
  },
  methods: {
    evalService() {
      let dialogParams = {
        view: 'evaluate',
        data: {
          isHumanEval: false,
          ifJudge: false
        }
      }
      this.openDialog(dialogParams)
    },
    askRobot(text, saveInStorage) {
      this.showCustomerText(text, saveInStorage)
      this.questionJudge(text)
    },
    showCustomerText(text, saveInStorage = false) {
      let msg = {
        type: 0,
        isService: false,
        currentView: 'customerText',
        data: { text }
      }
      this.saveInMsgList(msg)
      saveInStorage && this.saveInStorage(msg)
    },
    async showImage(url, isService = false) {
      // 预加载图片，为了显示的时候滚动条能滚到底
      await preloadImg(url)
      let msg = {
        type: 1,
        isService,
        currentView: 'imageMsg',
        data: { url }
      }
      this.saveInMsgList(msg)
      this.saveInStorage(msg)
    },
    async autoQuery(queryType) {
      let customerType = Cookies.get('type')
      if (customerType === 'visitor') {
        Cookies.remove('access_token')
        Cookies.remove('userId')
        location.href = `${AC_LOGIN_PREFIX}${location.href}`
        return
      }
      let maps = {
        1: { type: 7, currentView: 'loanProgress', text: '借款进度' },
        2: { type: 8, currentView: 'queryBalance', text: '查询余额' },
        3: { type: 9, currentView: 'queryRepay', text: '还款查询' },
        4: { type: 10, currentView: 'queryCashStatus', text: '提现查询' }
      }
      let { type, currentView, text } = maps[queryType]
      this.showCustomerText(text)

      let { data } = await this.$httpService.autoQuery({
        type: Number.parseInt(queryType),
        channel_id: this.channel_id
      })
      let serviceMsg = {
        type,
        isService: true,
        currentView,
        data
      }
      this.saveInMsgList(serviceMsg)
    },
    // 图片上传
    async imgUpload(e) {
      const fileTypes = ['image/jpeg', 'image/png']
      let file = e.target.files[0]
      if (!file.type || !fileTypes.includes(file.type)) {
        this.$message.alert('图片只能为jpg或者png类型')
        return
      }
      try {
        // 对图片进行压缩
        let res = await lrz(file)
        console.log(res.formData, res.fileLen)
        // 压缩过的图片不能大于10M
        if (res.fileLen >= 10 * 1024 * 1024) {
          this.$message.alert('图片尺寸过大，请重新上传')
          return
        }
        let { data } = await uploadImg(res.formData)
        let fileUrl = data.data.file_url
        console.log('data', fileUrl)
        if (data.ret !== 0) {
          this.$message.alert('图片上传失败')
          return
        }
        await this.showImage(fileUrl)

        let extraParams = {
          sessionId: this.sessionId,
          msg: {
            type: 2,
            content: {
              name: fileUrl.substring(fileUrl.lastIndexOf('/') + 1),
              imageUri: fileUrl
            }
          }
        }
        this.ws.send(this.createWsParams(110, extraParams))
        e.target.value = ''
      } catch (error) {
        this.$message.alert('图片上传失败')
        console.error(error)
      }
    },
    focusInput() {
      if (this.isIOS) {
        this.isKeyboardBounce = true
        this.goToBottom()
      }
    },
    blurInput() {
      this.isIOS && (this.isKeyboardBounce = false)
    },
    // 生成传入websoket的参数, type为ws请求类型，params为基础参数后额外的参数
    createWsParams(type, extraParams) {
      let timestamp = new Date().getTime()
      let basicParams = {
        type,
        messageId: timestamp,
        time: timestamp,
        token: this.crmToken
      }
      return JSON.stringify(Object.assign(basicParams, extraParams))
    },
    // 转人工
    async transHuman(type) {
      clearTimeout(this.timer)
      let { token } = await this.$httpService.crmLogin()
      this.crmToken = token
      this.type = type
      this.startWs()
    },
    // 取消排队
    cancelQueue() {
      this.ws.send(this.createWsParams(102, { requestId: this.requestId }))
      this.isTransedHuman = false
    },
    // 推荐问题评价
    recommendEvaluate(text) {
      this.showCustomerServiceText(text, false, [], 2)
    },
    openDialog(data) {
      this.dialogView = data.view
      this.dialogVisible = true
      this.dialogParams = data.data
    },
    // 提交评价
    async submitEval(score) {
      if (!this.dialogParams.isHumanEval) {
        // 机器人评价
        await this.$httpService.insertCsEvaluate({
          channel_id: this.channel_id,
          evaluate: score
        })
      } else {
        // 人工评价
        this.ws.send(
          this.createWsParams(104, {
            sessionId: this.sessionId,
            rating: {
              ratingId: score,
              ratingComments: ''
            }
          })
        )
      }
      // 改变本条评价的评价状态
      this.dialogParams.ifJudge = true
      this.dialogVisible = false
    },
    // 发送内容
    async sendVal() {
      // 针对ios每次发完消息将输入框失焦
      if (this.isIOS) {
        this.$refs.sendWordInput.blur()
      }
      // 将客户说的话存入localStorage并显示出来
      this.showCustomerText(this.sendWord, true)
      clearTimeout(this.timer)
      let word = this.sendWord
      this.sendWord = ''
      if (!this.isTransedHuman) {
        await this.questionJudge(word, 0)
        // 2分钟弹出一次满意度评价的提示
        this.timer = setTimeout(() => {
          this.showCustomerServiceEvalHint()
        }, 120000)
      } else {
        // 如果为人工排队状态，发出预聊天请求，否则发起直接聊天请求
        let type = 110
        let extraParams = {
          sessionId: this.sessionId,
          msg: {
            type: 1,
            content: {
              text: word,
              extra: ''
            }
          }
        }
        if (!this.sessionId) {
          type = 111
          extraParams = {
            requestId: this.requestId,
            content: word
          }
        }
        this.ws.send(this.createWsParams(type, extraParams))
      }
    },
    // 保存消息到localStorage
    saveInStorage(msg) {
      let localMsgList = JSON.parse(localStorage.getItem('localMsgList'))
      if (!localMsgList) {
        localMsgList = []
      }
      // 只存最近的50条历史
      if (localMsgList.length >= 50) {
        localMsgList = localMsgList.slice(localMsgList.length - 49, localMsgList.length)
      }
      localMsgList.push({ ...msg, isHistoryMsg: true })
      localStorage.setItem('localMsgList', JSON.stringify(localMsgList))
    },
    // 保存消息到msgList，可传入多个参数
    saveInMsgList() {
      this.msgList.splice(this.msgList.length, 0, ...arguments)
    },
    // 显示客服的文本消息，默认不存入localStorage，设置saveInStorage为true则存入localStorage，
    // 传入recommends则显示推荐问题，否则不显示
    // textType为文本类型，1是普通问题问完客服说的话，2是用户评价完推荐问题后客服说的话
    // questionId为查询返回的当前问的问题question_id
    showCustomerServiceText(
      text,
      saveInStorage = false,
      recommends = [],
      textType = 1,
      questionId = -1
    ) {
      let msg = {
        isService: true,
        type: 0,
        currentView: 'textAndRecommends',
        data: { text, recommends, textType, questionId }
      }
      this.saveInMsgList(msg)
      saveInStorage && this.saveInStorage(msg)
    },
    // 显示客服发起的满意度评价的提示
    showCustomerServiceEvalHint(isHumanEval = false) {
      let msg = {
        isService: true,
        type: 4,
        currentView: 'evalHint',
        data: { ifJudge: false, isHumanEval }
      }
      this.saveInMsgList(msg)
    },
    // isTop为true则定位到头部，isTop为false则定位到底部
    goToBottom(isTop = false) {
      this.$nextTick(() => {
        let contentEl = this.$refs.content
        if (isTop) {
          contentEl.scrollTop = 0
          return
        }
        contentEl.scrollTop = contentEl.scrollHeight
      })
    },
    // 机器人接口
    async questionJudge(questionTitle, recommend = 0) {
      let { data } = await this.$httpService.callRobotQA({
        channel_id: this.channel_id,
        access_token: Cookies.get('access_token') || '',
        input_value: questionTitle,
        recommend: recommend
      })
      if (data.data.trans) {
        // 显示人工提示
        this.historyRecord = data.data.history
        let msg = {
          isService: true,
          type: 5,
          currentView: 'transHumanHint'
        }
        this.saveInMsgList(msg)
      } else {
        // 显示客服提示以及推荐问题并存入localStorage
        this.showCustomerServiceText(
          data.data.text,
          true,
          data.data.recommends,
          1,
          data.data.question_id
        )
      }
    },
    // 点击推荐问题
    consultRecommend(text) {
      let customerMsg = {
        isService: false,
        type: 0,
        data: { text },
        currentView: 'customerText'
      }
      this.saveInMsgList(customerMsg)
      this.saveInStorage(customerMsg)
      this.questionJudge(text, 1)
    },
    // 开启人工聊天
    startWs() {
      let timer = null
      let count = 0
      let connectWs = () => {
        this.ws = new WebSocket(`${wsConfig.urlPrefix}${this.crmToken}`)

        this.ws.onclose = e => {
          console.log('ws closed')
          this.isTransedHuman = false
        }

        this.ws.onopen = () => {
          clearInterval(timer)
          this.ws.send(
            this.createWsParams(101, {
              queueId: this.type,
              from: 'APP'
            })
          )

          this.isTransedHuman = true
        }

        this.ws.onmessage = this.onmessage
      }

      connectWs()

      this.ws.onerror = () => {
        // 断网重连最多10次后断开连接
        timer = setInterval(() => {
          if (count < 10) {
            connectWs()
            count++
          } else {
            clearInterval(timer)
          }
        }, 2000)
      }
    },
    onmessage(res) {
      let data = eval('(' + res.data + ')')
      switch (data.type) {
        // 客户端发起聊天请求服务端响应101
        case 101:
          if (data.result !== 1) {
            // 如果ws请求出错返回错误信息显示给用户
            this.closeWs()
            this.showCustomerServiceText(data.message)
          } else {
            // data.continueLastSession为true则不用排队，直接显示客服推送的消息并存入localStorage，
            // 否则需要排队，显示排队的提示
            let msg = {
              isService: true,
              type: 6,
              currentView: 'waitHumanHint',
              data: {
                queueNumber: data.queueLength
              }
            }
            if (data.continueLastSession) {
              msg = {
                isService: true,
                type: 0,
                currentView: 'textAndRecommends',
                data: {
                  text: data.message,
                  textType: 1,
                  questionId: -1
                }
              }
              this.saveInStorage(msg)
            }
            this.saveInMsgList(msg)
          }
          this.requestId = data.requestId
          break
        // 客户端发起取消聊天请求服务端响应102
        case 102:
          this.closeWs()
          break
        // 客户端收到结束会话的状态转机器人
        case 103:
          this.isTransedHuman = false
          break
        // 发送消息不正常后转回机器人
        case 110:
          if (data.result !== 1) {
            this.closeWs()
          }
          break
        // 服务端主动推送当前聊天状态
        case 201:
          if (![0, 1].includes(data.requestStatus)) {
            // 将取消排队的提示按钮置灰
            window.app.$emit('start-conversation')
            // 除了等待中和坐席接受两种状态以外其他状态直接关闭ws连接
            this.closeWs()
          }
          let texts = [
            '等待中',
            '坐席接受',
            '坐席拒绝',
            '排队超时',
            '异常丢失',
            '没有客服在线',
            '不在工作时间',
            '被客户取消'
          ]
          let statusText = texts[data.requestStatus] || '系统异常'
          this.showCustomerServiceText(statusText, true)
          break
        // 服务端主动推送当前可以开始聊天
        case 202:
          // 将取消排队的提示按钮置灰
          window.app.$emit('start-conversation')
          this.sessionId = data.sessionId
          // 推送客户跟机器人聊天的历史消息
          for (let { question, answer } of this.historyRecord) {
            let extraParams = {
              sessionId: this.sessionId,
              msg: {
                type: 1,
                content: {
                  text: `Ques: ${question}`,
                  extra: ''
                }
              }
            }
            this.ws.send(this.createWsParams(110, extraParams))
            extraParams.msg.content.text = `Answer: ${answer}`
            this.ws.send(this.createWsParams(110, extraParams))
          }
          break
        // 服务端主动关闭当前会话
        case 205:
          this.showCustomerServiceEvalHint(true)
          this.closeWs()
          break
        // 服务端主动推送消息给客户端
        case 210:
          this.sessionId = data.sessionId
          // type (5 系统消息)
          if (data.msg.type !== 99) {
            // 文本消息
            if (data.msg.type === 1) {
              this.showCustomerServiceText(data.msg.content, true)

              if (data.msg.content.indexOf('会话自动结束') !== -1) {
                this.isTransedHuman = false
              }
            }
            // 图片消息
            if (data.msg.type === 2) {
              this.showImage(`${wsConfig.crmPrefix}${data.msg.content.imgUrl}`, true)
            }
          }
          break
        default:
          break
      }
    },
    closeWs() {
      this.isTransedHuman = false
      this.ws.send(this.createWsParams(103, { sessionId: this.sessionId }))
    }
  }
}
