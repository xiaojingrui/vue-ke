
const md5 = require('./md5');//md5加密
const axios = require('axios');
// const app = express();
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());
const Crm = {
  login(callback){
    const crmUrl = "http://172.22.11.13:8080/webchat/tpi"; //过河兵登录接口
    //如果是登录
    // let params = {
    //   type: 1,
    //   loginName: 'lori',//登录名
    //   password: '',//密码
    //   epid: ''//企业号
    // }
    // //登录加注册，如果有这个用户就直接使用，没有就直接注册一个新的
    // let params = {
    //   type: 3,
    //   loginName: 'lori',//登录名
    //   name:'徐永川',//姓名
    //   portraitUrl: '',//头像地址
    //   epid: ''//企业号
    // }
    //如果是匿名访客登录
    let params = {
      type: 4,//匿名访客登录
      visitorId: '1319d73c-f001-482d-88f4-e758adac8f69',//访客唯一标识guid
      ipAddr: '',//访问请求过来的ip地址
      epid: ''//企业号
    }
    let PUBLIC_KEY = "ELITE_WEB_CHAT_1612081555";
    let paramsMd5 = md5.md5Encrypt((JSON.stringify(params)+PUBLIC_KEY));

    axios.post(crmUrl, params, {
      headers: {
        'Content-Type': 'application/json',
        "sign":paramsMd5
      }
    })
    .then((res)=> {
      console.log(res.data,"guohebing")
      callback && callback(res)
      //this.sendData(res.data);
    })
    .catch(function (error) {
      console.log("crm接口 error",error.data);
    });
  },
  //登陆后数据推送到前端
  sendData(data){
    // console.log("11")
    // var app = express();
    // var apiRoutes = express.Router();
    // apiRoutes.post('/crmlogin', function (req, res) {
    //   console.log("req")
    //   ///res.json(data);
    // });
    // app.use('/api', apiRoutes);
  }
}
module.exports = Crm;
