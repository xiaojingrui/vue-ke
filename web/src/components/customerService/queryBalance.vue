<template>
  <div class="query-balance common-msg-style fixed-width">
    <h5>账户余额</h5>
    <p>可用余额（元）</p>
    <h3>{{params.data.availableBalance}}</h3>
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
.query-balance {
  height: 260px;

  h5 {
    padding-top: 37px;
    padding-left: 34px;
    font-size: 26px;
  }

  p {
    text-align: center;
    margin-top: 30px;
    font-size: 26px;
  }
  h3 {
    text-align: center;
    font-size: 48px;
    margin-top: 13px;
  }
}
</style>
