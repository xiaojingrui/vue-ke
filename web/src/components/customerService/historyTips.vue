<template>
  <div class="history-line">
    <div class="history-line-content">
      <p>以下是本次消息</p>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
@import '../scssCalc.scss';
.history-line {
  padding: 25rem/$num 30rem/$num 56rem/$num;
  position: relative;
  .history-line-content {
    position: absolute;
    text-align: center;
    min-width: 600rem/$num;
    margin: 0 32rem/$num 0;
    font-size: 18rem/$num;
    color: #d4d2d2;
    p {
      font-size: 18rem/$num;
      line-height: 20px;
      &:after,
      &:before {
        background: #e5e5e5;
        content: '';
        height: 1px;
        position: absolute;
        top: 50%;
        width: 30%;
      }
      &:before {
        left: 0;
      }
      &:after {
        right: 0;
      }
    }
  }
}
</style>
