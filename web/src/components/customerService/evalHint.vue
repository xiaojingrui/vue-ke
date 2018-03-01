<template>
  <div class="common-msg-style fixed-width">
    <div class="robot-content" @click="clickStar">
      <p>亲爱的，小娜如有怠慢的地方，请您多包涵，辛苦您在聊天窗口满意度给我一个温暖的评价哦，请先点击小红心再评价。</p>
      <div class="star">
        <span v-for="item in 5" :key="item"></span>
      </div>
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
  methods: {
    clickStar() {
      let params = {
        view: 'evaluate',
        // 传入这个参数是为了评价提交时能直接改变这里的ifJudge的值，利用对象的复制是指针的复制的特点
        data: this.params.data
      }
      this.$emit('open-dialog', params)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scssCalc.scss';
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
  ul {
    li {
      font-size: 26rem/$num;
      color: rgba(51, 51, 51, 1);
      line-height: 40rem/$num;
      i {
        &:after {
          content: '·';
        }
      }
    }
  }
}
.star {
  justify-content: center;
  display: -webkit-flex;
  margin-top: 10rem/$num;
  span {
    width: 44rem/$num;
    height: 40rem/$num;
    display: block;
    margin-right: 22rem/$num; //每一个星星dom都有外边距
    background-size: cover;
    background-image: url(#{$baseCompImgUrl}/red-heart.svg);
  }
}
</style>
