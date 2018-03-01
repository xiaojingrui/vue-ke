<template>
  <div class="no-loan center-center">
      <div class="no-loan-content">
        <p>您目前并无{{text}}，发布借款请点击：</p>
        <button @click="loan">我要借款</button>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    loan() {
      window.app.$emit('ask-robot', { text: '我要借款', inStorage: true })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../scssCalc.scss';
.no-loan {
  height: 240px;

  .no-loan-content {
    font-size: 26px;
    width: 17em;
    text-align: center;
  }
  button {
    width: 140px;
    height: 50px;
    background-color: $primaryColor;
    margin-top: 30px;
    color: #fff;
  }
}
</style>
