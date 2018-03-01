export default {
  // 初始化
  init() {
    /*
    **判断是否在app内、
    **appVersion inv_app(在) other(不在)
    */
    var appVersion = 'other'
    if (navigator.userAgent.indexOf('appVersion') != -1) {
      appVersion = 'inv_app'
    } else {
      appVersion = 'other'
    }
    // 神策埋点
    ;(function(para) {
      var p = para.sdk_url,
        n = para.name,
        w = window,
        d = document,
        s = 'script',
        x = null,
        y = null
      w['sensorsDataAnalytic201505'] = n
      w[n] =
        w[n] ||
        function(a) {
          return function() {
            ;(w[n]._q = w[n]._q || []).push([a, arguments])
          }
        }
      var ifs = [
        'track',
        'quick',
        'register',
        'registerPage',
        'registerOnce',
        'clearAllRegister',
        'trackSignup',
        'trackAbtest',
        'setProfile',
        'setOnceProfile',
        'appendProfile',
        'incrementProfile',
        'deleteProfile',
        'unsetProfile',
        'identify',
        'login',
        'logout',
        'trackLink',
        'clearAllRegister'
      ]
      for (var i = 0; i < ifs.length; i++) {
        w[n][ifs[i]] = w[n].call(null, ifs[i])
      }
      if (!w[n]._t) {
        x = d.createElement(s)
        y = d.getElementsByTagName(s)[0]
        x.async = 1
        x.src = p
        y.parentNode.insertBefore(x, y)
        w[n].para = para
      }
    })({
      sdk_url: 'https://ac.xxx.com/js/sensorsdata.min.js',
      name: 'sa',
      server_url: 'https://sensorsdata.xxx.com/sa/?project=production'
    })
    sa.registerPage({
      product: appVersion, // 产品线名称，对应各个产品线，借款app对应loan_app,没有则传other
      platform: 'H5', // 平台类型H5
      product_h5: 'freebuy_h5', // 区分不同的业务线  （方便后台看数据）
      h5_channel: this.getQueryString('regsourceid') ? this.getQueryString('regsourceid') : '', // h5页面来源渠道，如果h5是app内部打开就传空字符串
      user_agent: window.navigator.userAgent, // http头中的useragent字段
      source: this.getQueryString('source') ? this.getQueryString('source') : ''
    })
    sa.quick('autoTrack')
  },
  // 获取用户username
  getUsername(userName) {
    if (userName) {
      sa.login(userName)
    }
  },
  /**
   * 神策埋点通用方法
   * @param  {[string]} parText [控件显示文本]
   * @param  {[string]} parTargetUrl [点击要跳转的URL]
   * 调用方式(按钮点击)：saTrack('立即拿钱','http://m.xxx.com')
   */
  saTrackBtn(parText, parEventId, parTargetUrl) {
    sa.track('h5_clk', {
      tgt_type: 'button',
      tgt_name: 'h5-' + parText,
      tgt_event_id: 'h5_' + parEventId,
      target_url: parTargetUrl,
      url: location.href
    })
  },
  /**
   * h5_clk 统计调用
   */
  TrackBtn() {
    var self = this
    let SCbtn = document.querySelectorAll('.shenCe-btn')
    for (var i = 0; i < SCbtn.length; i++) {
      ;(function(arg) {
        SCbtn[i].onclick = e => {
          let currentTarget = e.currentTarget
          let name = currentTarget.getAttribute('shenCe-name')
          let shenCeId = currentTarget.getAttribute('shenCe-id')
          self.saTrackBtn(name, shenCeId, location.href)
        }
      })(i)
    }
  },
  /**
   * 神策埋点通用方法
   * @param  {[string]} parId   [mobile,imgcode,smscode,password]
   * 调用方式(输入框失去焦点)：saTrack('mobile')
   */
  saTrackTxt(showtxt, tgId) {
    sa.track('h5_input', {
      tgt_type: 'text',
      tgt_name: 'h5-' + showtxt,
      tgt_event_id: 'h5_' + tgId,
      url: location.href
    })
  },
  getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
  }
}
