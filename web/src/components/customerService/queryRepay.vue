<template>
  <div class="common-msg-style fixed-width">
    <div class="query-repay" v-if="params.data.length">
      <h5>还款计划</h5>
      <ul>
        <li v-for="(item,index) in params.data" :key="index" :class="{'paid': item.payStatus === '1'}">
          <div class="space-between-center">
            <div :class="[{overdue: item.payStatus === '2'}, 'flex-start-center']">{{item.date}}应还（元）</div>
            <div>第{{item.currentNum}}期 | 共{{item.totalNum}}期</div>
          </div>
          <div class="space-between-center">
            <h2>{{item.payableAmount}}</h2>
            <button v-if="item.payStatus !== '1'" @click="$emit('ask-robot', '立即还款', true)">还款</button>
          </div>
        </li>
      </ul>
    </div>
    <no-loan text="待还" v-else></no-loan>
  </div>
</template>
<script>
import noLoan from '../common/noLoan'
export default {
  props: {
    params: {
      type: Object,
      required: true
    }
  },
  components: { noLoan }
}
</script>
<style lang="scss" scoped>
@import '../scssCalc.scss';
.query-repay {
  font-size: 26px;
  h5 {
    padding: 38px 34px 0;
  }
  li {
    position: relative;
    padding: 40px 34px;

    > div:first-child {
      margin-bottom: 32px;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #e5e5e5;
    }

    &.paid:after {
      content: '';
      position: absolute;
      display: inline-block;
      right: 50px;
      top: 50px;
      width: 112px;
      height: 112px;
      background: url(#{$baseCompImgUrl}/paid-icon.svg) no-repeat 0 0;
      background-size: cover;
      transform: rotate(30deg);
    }
  }
  button {
    width: 150px;
    height: 50px;
    background-color: $primaryColor;
    color: #fff;
  }
  h2 {
    font-size: 48px;
  }
  .overdue:before {
    content: '逾期';
    display: inline-block;
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 24px;
    color: $red;
    border: 1px solid $red;
    margin-right: 13px;
  }
}
</style>
