<template>
  <!-- 转人工的提示 -->
  <div class="tip-replay common-msg-style max-width">
    <div class="tip-content">
      <p>很抱歉，小娜不是很明白您的意思，请您换一种问法。 如您需要转接人工，请选择队列:</p>
      <ul>
        <li v-for="item in questions" :key="item.text" :class="{forbid: isDisabled}" @click="isDisabled ? '' : transHuman(item)">
          {{item.text}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      questions: [
        {
          text: '借款问题',
          value: 8
        },
        {
          text: '投资问题',
          value: 9
        },
        {
          text: '账号问题',
          value: 7
        }
      ],
      isDisabled: false
    }
  },
  methods: {
    transHuman({ value }) {
      this.isDisabled = true
      this.$emit('trans-human', value)
    }
  },
  created() {
    // 测试队列
    if (process.queue.test) {
      this.questions = [
        {
          text: '测试个人',
          value: 15
        },
        {
          text: '测试借款',
          value: 16
        },
        {
          text: '测试投资',
          value: 17
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scssCalc.scss';
.tip-content {
  p {
    font-size: 26rem/$num;
    padding: 22rem/$num 54rem/$num 28rem/$num 38rem/$num;
    color: rgba(51, 51, 51, 1);
    line-height: 40rem/$num;
    text-align: -webkit-justify;
    text-align: -moz-justify;
    text-align: justify;
    &.busy {
      font-size: 18rem/$num;
      color: rgba(153, 153, 153, 1);
      line-height: 35rem/$num;
    }
  }
  ul {
    display: -webkit-flex;
    justify-content: space-around;
    border-top: 1px solid rgba(229, 229, 229, 1);
    li {
      font-size: 28rem/$num;
      color: rgba(83, 140, 233, 1);
      height: 79rem/$num;
      line-height: 79rem/$num;
      border-right: 1px solid rgba(229, 229, 229, 1);
      flex: 1;
      text-align: center;
      &:nth-last-child(1) {
        border-right: 0;
      }
    }
  }
}
</style>
