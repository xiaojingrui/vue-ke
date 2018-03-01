<template>
  <div class="flex-end-center">
    <div class="customer">
      {{params.data.text}}
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
  }
}
</script>
<style lang="scss" scoped>
.customer {
  max-width: 560px;
  margin-top: 30px;
  margin-right: 30px;
  font-size: 0.65rem;
  font-family: PingFangSC-Regular;
  color: white;
  line-height: 1rem;
  padding: 0.5rem 1.15rem;
  background: #538ce9;
  border-radius: 1rem 1rem 0.1rem 1rem;
  text-align: justify;
}
</style>
