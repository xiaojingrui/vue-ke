<template>
  <div class="loan-progress common-msg-style fixed-width">
    <div class="has-loan" v-if="params.data.creationDate">
      <div class="loan-title space-between-center">
        <h5>借款进度</h5>
        <span :class="{red: isLoanFailed}">{{params.data.currentProgress}}</span>
      </div>
      <ul class="loan-content space-between-center">
        <li>
          <div>{{params.data.loanAmount}}</div>
          <div>借款金额(元)</div>
        </li>
        <li class="limit-rate">
          <div><span>{{params.data.loanLimit}}个月</span> | {{params.data.rate}}</div>
          <div><span>期限</span> | 利率</div>
        </li>
        <li>
          <div>{{creationDate}}</div>
          <div class="create-time">发标时间</div>
        </li>
      </ul>
    </div>
    <no-loan text="借款" v-else></no-loan>
  </div>
</template>
<script>
import noLoan from '../common/noLoan'
export default {
  components: { noLoan },
  props: {
    params: {
      type: Object,
      required: true
    }
  },
  computed: {
    isLoanFailed() {
      return ['流标', '失败', '撤标'].includes(this.params.data.currentProgress)
    },
    creationDate() {
      let creationDate = this.params.data.creationDate
      return creationDate.slice(2, creationDate.length)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scssCalc.scss';
.has-loan {
  height: 290px;
  box-sizing: border-box;
  padding: 43px 34px 70px 34px;
  @include setFlexPos(space-between, center);
  flex-direction: column;

  > div {
    width: 100%;
  }
}
.loan-title {
  h5 {
    font-size: 26px;
  }
  span {
    font-size: 28px;
    font-weight: bold;
    color: $primaryColor;

    &.red {
      color: $red;
    }
  }
}
.loan-content {
  width: 100%;
  font-size: 24px;

  div:first-child {
    font-size: 28px;
    color: #242424;
  }
  div:last-child {
    color: #999;
    margin-top: 20px;
  }
  .create-time {
    text-align: right;
  }
  .limit-rate {
    span {
      display: inline-block;
      width: 90px;
      text-align: right;
    }
  }
}
</style>
