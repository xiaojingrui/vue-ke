import axios from 'axios'

export default async () => {
  let url = window.location.href.split('#')[0]
  let { data } = await axios
    .create({
      baseURL: 'http://wechat.ppdai.com',
      timeout: 10000,
      withCredentials: true
    })
    .get('/jssdk/init', { params: { url } })
  alert(data)
  wx.config({
    debug: true,
    appId: data.content.appId,
    timestamp: data.content.timestamp,
    nonceStr: data.content.nonceStr,
    signature: data.content.signature,
    jsApiList: ['chooseImage']
  })
}

export let chooseImg = callback => {
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function(res) {
      callback && callback()
      // var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
    }
  })
}
