import Vue from 'vue'
import router from './router'
import '@js/initRem'
import '@scss/common'
import '@/directives'

import FastClick from 'fastclick'
FastClick.attach(document.body)

import httpService from './service'
Vue.prototype.$httpService = httpService

import { MessageBox, Popup, Radio } from 'mint-ui'
import 'mint-ui/lib/popup/style.css'
import 'mint-ui/lib/radio/style.css'
import '@scss/mint-ui-reset/message-box.scss'
import '@scss/mint-ui-reset'

Vue.component(Popup.name, Popup)
Vue.component(Radio.name, Radio)
Vue.prototype.$message = MessageBox

Vue.config.productionTip = false

/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  template: '<router-view/>'
})
