<template>
  <div class="take" :style="{'padding-bottom': `${paddingBottom}px`}" ref="take">
    <div class="take-header">
      <a class="left-arrow flex-start-center" href="javascript:void(0);" @click="$router.go(-1)">返回</a>
    </div>
    <div class="content-container">
      <ul :class="['content', {'transfer-human':isTransedHuman}]" ref="content">
        <li v-for="(msg,index) in msgList" :key="index">
          <component @consult-recommend="consultRecommend" @open-dialog="openDialog" :is="msg.currentView" :params.sync="msg"
            @trans-human="transHuman" @recommend-evaluate="recommendEvaluate" @cancel-queue="cancelQueue"
            @go-to-bottom="goToBottom" @ask-robot="askRobot"></component>
        </li>
      </ul>
      <ul class="common-query flex-start-center" v-if="!isTransedHuman">
        <li v-for="item in commonQueries" :key="item.text" @click="autoQuery(item.type)">
          {{item.text}}
        </li>
      </ul>
      <div class="my-footer flex-start-center" ref="footer">
        <i class="keyboard-icon"></i>
        <input ref="sendWordInput" @blur="blurInput" @focus="focusInput" type="text" v-model.trim="sendWord"
          placeholder='点此提问小娜或者找客服' @keyup.enter="sendWord ? sendVal() : ''">
        <i :class="['send-icon', {active: sendWord !== ''}]" @click="sendWord ? sendVal() : ''"></i>
      </div>
      <ul class="footer-functions flex-start-center">
        <li class="heart-icon" @click="evalService">
        </li>
        <li class="img-uploader-icon" v-if="isTransedHuman">
          <input class="img-uploader" type="file" @change="imgUpload" accept="image/*">
        </li>
      </ul>
    </div>
    <mt-popup v-model="dialogVisible" position="bottom">
      <component @close-dialog="dialogVisible = false" @submit-evaluate="submitEval" v-if="dialogVisible" :is="dialogView"
        :params.sync="dialogParams"></component>
    </mt-popup>
  </div>
</template>

<script>
import take from './take'
export default take
</script>
<style lang="scss" src="./take.scss">

</style>
