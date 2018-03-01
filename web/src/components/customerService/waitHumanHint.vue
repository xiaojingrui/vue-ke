<template>
  <div class="line-up">
    <div class="line-up-content common-msg-style max-width">
      <h3>非常抱歉！</h3>
      <p>客服全忙，前面有<span>{{params.data.queueNumber}}人</span>排队，您可以先描述问题，或者取消排队继续跟小娜聊天。</p>
      <div :class="['cancel-queue-btn', {forbid: btnDisabled}]" @click="btnDisabled ? '' : cancelQueue()">取消排队</div>
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
      btnDisabled: false
    }
  },
  methods: {
    cancelQueue() {
      this.btnDisabled = true
      this.$emit('cancel-queue')
    }
  },
  created() {
    console.log('wait human hint created')
    window.app.$on('start-conversation', () => {
      console.log('start-conversation')
      this.btnDisabled = true
    })
  },
  destroyed() {
    console.log('wait human hint destroyed')
    window.app.$off(['start-conversation'])
  }
}
</script>
<style lang="scss" scoped>
@import '../scssCalc.scss';
.line-up-content {
  h3 {
    font-size: 33rem/$num;
    color: rgba(51, 51, 51, 1);
    padding: 28rem/$num 54rem/$num 10rem/$num 38rem/$num;
  }
  p {
    font-size: 26rem/$num;
    padding: 22rem/$num 54rem/$num 28rem/$num 38rem/$num;
    color: rgba(51, 51, 51, 1);
    line-height: 40rem/$num;
    text-align: justify;
    span {
      color: #4375e3;
    }
  }
  .cancel-queue-btn {
    text-align: center;
    display: block;
    border-top: 1px solid rgba(229, 229, 229, 1);
    @include setHeight(79px);
    color: rgba(83, 140, 233, 1);
  }
}
</style>
