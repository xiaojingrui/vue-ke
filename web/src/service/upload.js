import axios from 'axios'
import md5 from 'js-md5'

let baseURL = '//kefu.xxx.com/customer/'

if (process.env.NODE_ENV === 'development') {
  baseURL = '//kefu1.xxx.com/customer/'
}

const _http = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  withCredentials: true
})

export default formData => {
  let appid = 1000001107
  let uploadTime = new Date().getTime()
  let sign = md5.hex(`${appid}${uploadTime}file11`)
  formData.append('appid', appid)
  formData.append('uploadTime', uploadTime)
  formData.append('sign', sign)
  return _http.post('/upload', formData)
}
