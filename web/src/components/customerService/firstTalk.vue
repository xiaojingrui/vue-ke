<template>
  <div class="robot-take common-msg-style fixed-width">
    <div class="robot-content">
      <p>我是小娜，大部分的问题我都会哦，可以直接向我提问哦。</p>
      <p class="busy">遇到我暂时不会的复杂问题，小娜会帮您联系人工客服哦。</p>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
@import '../scssCalc.scss';
.robot-take {
  .robot-content {
    padding: 22rem/$num 54rem/$num 28rem/$num 38rem/$num;
    p {
      font-size: 26rem/$num;
      font-family: PingFangSC-Regular;
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
  }
}
</style>
