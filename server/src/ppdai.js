import axios from 'axios'

let _http = axios.create({
  baseURL: 'http://xxx.xxx.com/customer/',
  headers: {
    'Content-Type': 'application/json'
  }
})

_http.interceptors.request.use(
  function(config) {
    console.log('url:', config.url)
    console.log('data:', config.data)
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

_http.interceptors.response.use(
  function(response) {
    let { data } = response
    return data
  },
  function(error) {
    console.error(error)
    return Promise.reject(error)
  }
)

function HttpService() {
  this.getToken = () => {
    return _http.get('/getToken')
  }
  this.getAuthObject = params => {
    return _http.post('/getAuthObject', params)
  }
  this.insertCsEvaluate = params => {
    return _http.post('/insertCsEvaluate', params)
  }
  this.insertQaEvaluate = params => {
    return _http.post('/insertQaEvaluate', params)
  }
  this.getRecommendQAList = params => {
    return _http.post('/getRecommendQAList', params)
  }
  this.getSRqaList = params => {
    return _http.post('/getSRqaList', params)
  }
  this.callRobotQA = params => {
    return _http.post('/callRobotQA', params)
  }
  this.getLoanProgress = params => {
    return _http.post('/getLoanProgress', params)
  }
  this.getBalance = params => {
    return _http.post('/getBalance', params)
  }
  this.getRepaymentList = params => {
    return _http.post('/getRepaymentList', params)
  }
  this.getDrawCashStatus = params => {
    return _http.post('/getDrawCashStatus', params)
  }
}
module.exports = new HttpService()
