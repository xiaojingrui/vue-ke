<template>
  <div class="common-msg-style fixed-width cash-status">
    <h5>提现进度</h5>
    <p class="margin-top">尊敬的用户，您最近一笔提现申请详情如下：</p>
    <div class="cash-info">
      提现金额：{{params.data.amount}}
      <br/> 预计到账时间：{{params.data.cashTime}}
      <br/>当前状态：<span>{{params.data.orderStatus}}</span>
    </div>
    <p class="margin-top">如有疑问，请联系客服。</p>
  </div>
</template>
<script>
export default {
  props: {
    params: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scssCalc.scss';
.cash-status {
  padding: 30px 34px;
  box-sizing: border-box;

  p,
  .cash-info {
    font-size: 24px;
    color: #999;
  }

  h5 {
    font-size: 26px;
  }

  .margin-top {
    margin-top: 30px;
  }

  .cash-info {
    line-height: 1.5;

    span {
      color: $primaryColor;
    }
  }
}
</style>
