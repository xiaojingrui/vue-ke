import Vue from 'vue'
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function(el) {
    // 聚焦元素
    el.focus()
    setTimeout(function() {
      el.scrollIntoView(true)
    }, 100)
    el.onfocus = function() {
      setTimeout(function() {
        el.scrollIntoView(true)
      }, 100)
    }
  }
})
