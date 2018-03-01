// APP客户端接口
import './jppd-1.0.0'
var appVersion
if (navigator.userAgent.indexOf('appVersion') !== -1) {
  appVersion = true
} else {
  appVersion = false
}
if (appVersion) {
  ppd.config({
    debug: false,
    appId: '',
    timestamp: '',
    nonceStr: '',
    signature: '',
    jsApiList: []
  })
  ppd.ready(function() {})
}

export default {
  /**
   *判断是否是登陆状态
   * activityId  (2026测试环境，87线上环境)
   */
  login: function() {
    var self = this
    if (!appVersion) {
      window.location.href =
        'https://ac.xxx.com/activitypage?activityId=2026&redirect=' +
        encodeURIComponent(window.location.href)
      return false
    }
    ppd.ready(function() {
      if (!self.getCookie('token')) {
        // 登录hybrid
        ppd.call('jfLogin', {
          success: function(res) {
            // 客户端登录成功
            ppd.call('jfRefreshH5', {
              refreshUrl: window.location.href,
              success: function(res) {},
              fail: function(res) {
                alert('客户端未登录')
              }
            })
          },
          cancel: function(res) {
            ppd.call('jfCloseWin')
          }
        })
      }
    })
  },
  // 跳到首页  关闭H5
  jumpHome() {
    ppd.call('jfCloseWin')
  },
  /*
  **充值提现
  **value 1是充值，2是提现
  */
  jfWallet: function(value) {
    if (!appVersion) {
      // 只支持充值，暂不支持提现
      window.location.href =
        'https://wappay.xxx.com/?callbackUrl=' + encodeURIComponent(window.location.href)
      return false
    }
    ppd.call('jfWallet', {
      type: value,
      success: function(res) {
        alert('success')
      },
      fail: function(res) {
        alert('失败')
      }
    })
  },
  /**
   * 页面顶部title导航可见
   *title  标题的文案
   */
  showTitleBar: function(title) {
    if (!appVersion) return false
    ppd.ready(function() {
      ppd.call('jfTitleBar', {
        visible: 1,
        titlename: title
      })
    })
  },
  hideTitleBar: function() {
    if (!appVersion) return false
    ppd.ready(function() {
      ppd.call('jfTitleBar', {
        visible: 0
      })
    })
  },
  // 跳转彩虹计划
  rainbow: function() {
    if (!appVersion) {
      window.location.href =
        '//m.xxx.com/?xxxjson={"Nu":"2121","Na":"聚宝摩贝畅“享”016期","T":"2","P":"20001","L":"m.xxx.com","A":"2"}'
      return false
    }
    ppd.call('jfOpenWin', {
      url: 'xxx://lender.xxx.com/page/tab?page=rainbowlist'
    })
  },
  // 跳转散标
  vast: function() {
    if (!appVersion) {
      window.location.href =
        '//m.xxx.com/?xxxjson={"Nu":"2121","Na":"聚宝摩贝畅“享”016期","T":"2","P":"10001","L":"m.xxx.com","A":"2"}'
      return false
    }
    ppd.call('jfOpenWin', {
      url: 'xxx://lender.xxx.com/page/tab?page=bidlist'
    })
  },
  // 分享
  share: function() {
    if (!appVersion) {
      window.location.href = 'http://m.xxx.com/?share'
      this.shareData()
      return false
    }
    ppd.call('jfShare', {
      imgURL: 'http://m.xxxcdn.com/act/cj/images/share_icon.png', // 分享左侧图片链接地址
      title: '师徒计划', // 分享标题
      desc: 'iPhone6s、9万元理财金免费送，新手特权年化9.9%短期理财，先到先得！', // 分享窗口简要介绍
      linkURL: 'http://m.xxx.com/act/app/hytj/', // 分享窗口的链接地址
      type: 3, // 1,2,3 1=>登陆 2=>注册 3=>不需要判断登陆状态 //默认值3
      remark: '', // 备注 额外需要添加的参数等
      platforms: [5, 4, 2, 1, 3, 0, 6], // 分享渠道  0=>sina,1=>QQ空间,2=>QQ,3=>QQ微博,4=>微信好友，5=>微信朋友圈,6=>复制链接,7 ...
      callback: true, // true或false
      newcallback: 2, // 0=>不需要任何操作 , 1=>回调js, 2=>回调esb接口
      //            jsFunctionName:shareSuccess('测试分享成功后回调'),
      parms: { TaskTypeId: 4 }, // callback为ture  回调参数（必填）接口的参数
      interfaceName: '/oper/MentorShipService/FinishTaskShare', // 接口地址  如果此接口不需要参数 parameter 为空
      success: function(res) {
        alert('H5弹框数据来自native = ' + JSON.stringify(res))
      },
      cancel: function(res) {
        alert('取消')
      }
    })
  },
  // 兼容app 4.6一下版本
  shareData: function() {
    var iosArr = [5, 4, 2, 1, 3, 0, 6]
    var androidArr = [1, 0, 2, 3, 4, 5, 6]
    var parmsData = { TaskTypeId: 4 }
    var parameter = JSON.stringify(parmsData) // 回调参数名
    var iosDatas = {
      imgURL: 'http://m.xxxcdn.com/act/cj/images/share_icon.png', // 分享左侧图片链接地址
      title: '师徒计划', // 分享标题
      desc: 'iPhone6s、9万元理财金免费送，新手特权年化9.9%短期理财，先到先得！', // 分享窗口简要介绍
      linkURL: 'http://m.xxx.com/act/app/hytj/', // 分享窗口的链接地址
      type: 3, // 1,2,3 1=>登陆 2=>注册 3=>不需要判断登陆状态 //默认值3
      remark: '', // 备注 额外需要添加的参数等
      platforms: iosArr, // 分享渠道  0=>sina,1=>QQ空间,2=>QQ,3=>QQ微博,4=>微信好友，5=>微信朋友圈,6=>复制链接,7 ...
      callback: true, // true或false
      newcallback: 2, // 0=>不需要任何操作 , 1=>回调js, 2=>回调esb接口
      // jsFunctionName: shareSuccess('测试分享成功后回调'),
      parms: parameter, // callback为ture  回调参数（必填）接口的参数
      interfaceName: '/oper/MentorShipService/FinishTaskShare' // 接口地址  如果此接口不需要参数 parameter 为空
    }
    var androidDatas = {
      imgURL: 'http://m.xxxcdn.com/act/cj/images/share_icon.png', // 分享左侧图片链接地址
      title: '师徒计划', // 分享标题
      desc: 'iPhone6s、9万元理财金免费送，新手特权年化9.9%短期理财，先到先得！', // 分享窗口简要介绍
      linkURL: 'http://m.xxx.com/act/app/hytj/', // 分享窗口的链接地址
      type: 3, // 1,2,3 1=>登陆 2=>注册 3=>不需要判断登陆状态 //默认值3
      remark: '', // 备注 额外需要添加的参数等
      platforms: androidArr, // 分享渠道  0=>微信,1=>微信朋友圈,2=>QQ,3=>QQ空间,4=>sina微博，5=>复制链接,6=>我的二维码,7 ...
      callback: true, // true false
      newcallback: 2, // 0=>不需要任何操作 , 1=>回调js, 2=>回调esb接口
      // jsFunctionName: shareSuccess('测试分享成功后回调'),
      parms: parameter, // callback为ture  回调参数（必填）接口的参数
      interfaceName: '/oper/MentorShipService/FinishTaskShare' // 接口地址  如果此接口不需要参数 parameter 为空
    }
    var strData = JSON.stringify(iosDatas)
    var isIOS =
      navigator.userAgent.match('iPad') ||
      navigator.userAgent.match('iPhone') ||
      navigator.userAgent.match('iPod')
    if (!isIOS) {
      strData = JSON.stringify(androidDatas)
      window.xxx.callbackShare(strData)
    } else {
      return strData
    }
  },
  // 获取token
  getCookie: function(name) {
    var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
    if (arr != null) {
      return unescape(arr[2])
    } else {
      return null
    }
  }
}
// export default = AppBridge;
