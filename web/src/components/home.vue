<template>
  <div class="home">
    <div class="home-header">
      <div class="logo">
        <img src="../assets/logo.png" alt="">
        <p>{{sayHello}}
          <br/>我是小娜，已为您定制如下问题</p>
      </div>
    </div>
    <div class="content" id="home-content">
      <div class="guess-question">
        <div class="title">
          <h2>猜你想问</h2>
          <p @click="changeQuestion">换一换</p>
        </div>
        <div class="list-wrap">
          <div :class="['list', {'zhan':item.showQuestions.length>3}]" v-for="item in showQuestionList" :key="item.catagory">
            <div @click="foldWay(item)" class="question-container">
              <h3>{{item.catagory}}</h3>
              <div class="arrow-container"></div>
            </div>
            <ul class="question-list">
              <li :key="questionObj.question" v-for="questionObj in item.showQuestions" @click="questionJudge(questionObj)">{{questionObj.question}}</li>
            </ul>
          </div>
        </div>
      </div>
      <ul class="common-query flex-start-center">
        <li v-for="item in commonQueries" :key="item.text" @click="autoQuery(item)">
          {{item.text}}
        </li>
      </ul>
    </div>
    <router-link tag="div" class="my-footer flex-start-center" :to="{path:'/take',query: {channel_id}}">
      <i class="keyboard-icon"></i>
      <div class="input">点此提问小娜或者找客服</div>
      <i class="send-icon"></i>
    </router-link>
    <!-- 评价popup -->
    <mt-popup v-model="answerVisible" position="bottom">
      <div class="answer">
        <h2>
          {{currentQus.question}}
          <i class="close" @click="answerClose"></i>
        </h2>
        <p v-html="questionAnswer"></p>
        <div class="have-help flex-start-center">
          <p class="text">是否对您有帮助：</p>
          <ul class="flex-start-center use-list">
            <li @click="useClick(item)" v-for="item in useList" :key="item.text" :class="[`flex-start-center ${item.cls}`, {active: item.text === currentUseActive}]">{{item.text}}</li>
          </ul>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import commonQueries from './commonQueries'
import Cookies from 'js-cookie'
import { AC_LOGIN_PREFIX } from '@js/const'
export default {
  data() {
    return {
      answerVisible: false,
      sayHello: '您好',
      foldLi: [],
      currentQus: { question: '' },
      questionAnswer: '',
      questionList: [],
      showQuestionList: [],
      channel_id: '',
      commonQueries,
      useList: [
        {
          text: '有用',
          cls: 'zan',
          value: 1
        },
        {
          text: '无用',
          cls: 'cai',
          value: 0
        }
      ],
      currentUseActive: '',
      sceneId: ''
    }
  },
  async created() {
    let hours = new Date().getHours()
    switch (true) {
      case hours > 7 && hours < 13:
        this.sayHello = '早上好'
        break
      case hours >= 13 && hours < 19:
        this.sayHello = '下午好'
        break
      default:
        this.sayHello = '晚上好'
    }
    if (process.env.NODE_ENV === 'development') {
      this.channel_id = this.$route.query.channel_id || 72
    } else {
      this.channel_id = this.$route.query.channel_id || ''
    }
    this.sceneId = this.$route.query.scene_id || ''
    let res = null
    if (this.sceneId) {
      res = await this.$httpService.getSRqaList({
        channel_id: Number.parseInt(this.channel_id),
        sceneId: Number.parseInt(this.sceneId)
      })
    } else {
      res = await this.$httpService.getRecommendQAList({
        channel_id: Number.parseInt(this.channel_id)
      })
    }
    let { data } = res
    if (data && data.length) {
      this.transformData(data)
      this.questionList = data
      this.showQuestionList = this.questionList.slice(0, 3)
      this.showNum = 3
    }
  },
  methods: {
    autoQuery(item) {
      let type = Cookies.get('type')
      if (type === 'visitor') {
        Cookies.remove('access_token')
        Cookies.remove('userId')
        location.href = `${AC_LOGIN_PREFIX}${location.href}`
        return
      }
      this.$router.push({
        name: 'take',
        query: { channel_id: this.channel_id, query_type: item.type }
      })
    },
    transformData(questions) {
      questions.forEach(item => (item.showQuestions = item.questions.slice(0, 3)))
    },
    answerClose() {
      this.answerVisible = false
    },
    useClick(item) {
      if (!this.currentUseActive) {
        this.currentUseActive = item.text
        this.qaEvaluate(item.value)
      }
    },
    // 问题评价记录接口
    qaEvaluate(ifuseful) {
      let params = {
        questionTitle: this.currentQus.question,
        usefulState: ifuseful,
        channel_id: this.channel_id
      }
      this.sceneId && (params = { ...params, questionId: this.currentQus.id })
      this.$httpService.insertQaEvaluate(params)
    },
    changeQuestion() {
      this.transformData(this.showQuestionList)
      if (this.showNum >= this.questionList.length) {
        this.showNum = 0
      }
      this.showQuestionList = this.questionList.slice(this.showNum, this.showNum + 3)
      this.showNum += 3
    },
    // 问题评价
    async questionJudge(questionObj) {
      this.currentQus = questionObj
      let { data } = await this.$httpService.callRobotQA({
        channel_id: this.channel_id,
        access_token: Cookies.get('access_token') || '',
        input_value: questionObj.question,
        recommend: 2
      })
      this.questionAnswer = data.data.text
      this.answerVisible = true
      this.currentUseActive = ''
    },
    // 问题折叠 展开
    foldWay(item) {
      if (item.showQuestions.length > 3) {
        item.showQuestions = item.questions.slice(0, 3)
      } else {
        item.showQuestions = item.questions
      }
    }
  }
}
</script>
<style lang="scss" src="./home.scss">

</style>
