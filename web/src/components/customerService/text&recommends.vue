<template>
  <div class="flex-start-center">
    <div :class="['text-recommends-content common-msg-style max-width', {'fixed-width': isEvalShow}]">
      <p :class="['text', {recommend: params.data.textType === 2}]" v-html="params.data.text"></p>
      <template v-if="params.data.recommends && params.data.recommends.length">
        <p class="title">您是否要咨询以下问题？</p>
        <ul class="recommend-problem">
          <li @click="$emit('consult-recommend', text)" v-for="text in params.data.recommends" :key="text">
            <a href="javascript:void(0);">{{text}}</a>
          </li>
        </ul>
      </template>
      <template v-if="isEvalShow && isBtnShow">
        <ul class="btns flex-end-center" v-if="!params.isHistoryMsg">
          <li :class="[item.cls, {active:item.isActive}]" @click="btnClick(item)" v-for="item in btns" :key="item.type"></li>
        </ul>
        <template v-if="!isSatisfy">
          <h5>呜呜呜~ 很抱歉小娜没能解决您的问题，请您反馈原因，我会根据您的反馈进行优化与完善！</h5>
          <mt-radio class="notPxToRem"
            v-model="reason"
            :options="options">
          </mt-radio>
          <div class="submit-btn flex-end-center">
            <span :class="{disabled: !reason}" @click="!reason ? '' : submitEval()">提交</span>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    params: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      btns: [
        { type: 1, cls: 'useful', isActive: false },
        { type: 0, cls: 'useless', isActive: false }
      ],
      isSatisfy: true,
      reason: '',
      options: [
        {
          label: '答非所问',
          value: '1'
        },
        {
          label: '答案表述模糊，看不懂',
          value: '2'
        },
        {
          label: '答案太长',
          value: '3'
        },
        {
          label: '其他',
          value: '4'
        }
      ],
      isBtnShow: true
    }
  },
  computed: {
    isEvalShow() {
      return this.params.data.questionId !== -1
    }
  },
  methods: {
    async btnClick(item) {
      item.isActive = true
      if (item.type === 0) {
        this.isSatisfy = false
        this.$emit('go-to-bottom')
      } else {
        this.isBtnShow = false
        this.insertQaEvaluate()
      }
    },
    async insertQaEvaluate() {
      let channel_id = this.$route.query.channel_id
      let satisfied = this.isSatisfy ? 1 : 0
      let params = {
        channel_id,
        satisfied,
        questionTitle: '',
        questionId: this.params.data.questionId
      }
      if (this.reason) {
        params = { ...params, type: this.reason }
      }
      await this.$httpService.insertQaEvaluate(params)
      let texts = [
        '感谢您的反馈，小娜会刻苦学习，希望下次能帮您排忧',
        '感谢您的肯定，小娜会继续努力'
      ]
      this.$emit('recommend-evaluate', texts[satisfied])
    },
    submitEval() {
      this.isBtnShow = false
      this.insertQaEvaluate()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../scssCalc.scss';

.text-recommends-content {
  box-sizing: border-box;
  padding: 22rem/$num 54rem/$num 28rem/$num 38rem/$num;
  p {
    font-size: 26rem/$num;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
    line-height: 40rem/$num;
    text-align: -webkit-justify;
    text-align: -moz-justify;
  }
  .text {
    text-align: justify;
    &.recommend {
      color: #999;
    }
  }
  .title {
    margin-top: 48rem/$num;
  }
  .recommend-problem {
    a {
      color: rgba(83, 140, 233, 1);
      font-size: 26rem/$num;
      line-height: 44rem/$num;
      text-decoration: underline;
    }
  }
  .btns {
    margin-top: 30px;

    li {
      margin-left: 22px;
      width: 44px;
      height: 44px;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .useful {
      background-image: url(#{$baseCompImgUrl}/useful.svg);

      &.active {
        background-image: url(#{$baseCompImgUrl}/useful-active.svg);
      }
    }
    .useless {
      background-image: url(#{$baseCompImgUrl}/useless.svg);

      &.active {
        background-image: url(#{$baseCompImgUrl}/useless-active.svg);
      }
    }
  }

  h5 {
    color: #333333;
    margin: 55px 0 46px;
    font-size: 26px;
    line-height: 40px;
  }
  .submit-btn {
    margin-top: 30px;
    span {
      display: block;
      @include setTextCenter(100px, 44px);
      background-color: #538ce9;
      color: #fff;
      font-size: 24px;
      margin-left: 40px;

      &.disabled {
        background-color: #e5e5e5;
        color: #ababab;
      }
    }
  }
}
</style>
