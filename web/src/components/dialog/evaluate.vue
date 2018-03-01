<template>
  <div :class="['popup-judge', {'judge-over': params.ifJudge, judge:  !params.ifJudge}]">
    <template v-if="params.ifJudge">
      <img src="../../assets/judged.svg" alt="">
      <p>您已提交评价，感谢您的支持。</p>
      <div class="btn-judge" @click="$emit('close-dialog')">关闭</div>
    </template>
    <template v-else>
      <h2>评价</h2>
      <div class="star">
        <span v-for="index in 5" :key="index" @click="showStar(index)" :class="{on:currentStar>=index}"></span>
      </div>
      <p>{{judgeWord}}</p>
      <div class="btn-judge" @click="submitJudge">提交</div>
    </template>
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
      currentStar: 0
    }
  },
  computed: {
    judgeWord() {
      let words = [
        '请对本次服务进行评价',
        '非常不满意，各方面都比较差。',
        '不满意，比较差',
        '一般，还需改善',
        '比较满意，仍可改善',
        '非常满意，无可挑剔'
      ]
      return words[this.currentStar]
    }
  },
  methods: {
    async submitJudge() {
      // 未评价过或已评价点击无效果
      if (this.params.ifJudge || !this.currentStar) return
      this.$emit('submit-evaluate', this.currentStar)
    },
    showStar(index) {
      this.currentStar = index
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../scssCalc.scss';
.popup-judge {
  p {
    font-size: 30rem/$num;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 60rem/$num;
    text-align: center;
  }
  .btn-judge {
    width: 600rem/$num;
    height: 70rem/$num;
    line-height: 70rem/$num;
    background: rgba(83, 140, 233, 1);
    border-radius: 4rem/$num;
    font-size: 32rem/$num;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    margin: 0 auto 44rem/$num;
  }
}
.judge-over {
  img {
    display: block;
    margin: 70rem/$num auto 50rem/$num;
    width: 100rem/$num;
    height: 100rem/$num;
  }
  p {
    font-size: 40rem/$num;
  }
}
.judge {
  h2 {
    font-size: 36rem/$num;
    color: rgba(51, 51, 51, 1);
    line-height: 98rem/$num;
    font-weight: normal;
    text-align: center;
    border: 1px solid rgba(229, 229, 229, 1);
  }
  .star {
    justify-content: center;
    display: -webkit-flex;
    margin: 41rem/$num auto 47rem/$num;
    span {
      width: 80rem/$num;
      height: 70rem/$num;
      display: block;
      margin-right: 30rem/$num; //每一个星星dom都有外边距
      background-size: cover;
      background-image: url(#{$baseCompImgUrl}/gray-heart.svg);
      &.on {
        background-image: url(#{$baseCompImgUrl}/red-heart.svg);
      }
    }
  }
}
</style>
