
const axios = require('axios');
const ppdaiUrl = "http://customer.ppdapi.com:9090/customer/"; //拍拍贷接口
const ppdai = {
  //用户token生成
  getToken(callback){
    axios.post(ppdaiUrl+"getToken", {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res)=> {
      console.log(res.data,"用户token生成")
      callback && callback(res)
    })
    .catch(function (error) {
      console.log("pp用户token生成 error",error.data);
    });
  },
  //获取 userid
  getAuthObject(){
    axios.post(ppdaiUrl+"getAuthObject", {
      token:"62cfc486-35d5-43a4-930e-21efcc0dcca5"
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res)=> {
      console.log(res.data,"获取userid")
      callback && callback(res)
    })
    .catch(function (error) {
      console.log("ppd userid error",error.data);
    });
  },
  //客服评价记录
  insertCsEvaluate(callback){
    axios.post(ppdaiUrl+"insertCsEvaluate", {
      userId:"null",
      evaluate:3,
      Remark:""
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res)=> {
      callback && callback(res)
    })
    .catch(function (error) {
      console.log("pp客服评价记录 error",error.data);
    });
  },
  //问题评价记录
  insertQaEvaluate(callback){
    axios.post(ppdaiUrl+"insertQaEvaluate", {
      userId:"null",
      questionId:1,
      questionTitle:"好问题",
      usefulState:0,
      Remark:''
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res)=> {
      callback && callback(res)
    })
    .catch(function (error) {
      console.log("pp问题评价记录 error",error.data);
    });
  },
  //获取推荐问题列表
  getRecommendQAList(callback){
    axios.post(ppdaiUrl+"getRecommendQAList", {
      userId:"null",
      channel_id:"2"
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res)=> {
      callback && callback(res)
    })
    .catch(function (error) {
      console.log("pp获取推荐问题列表 error",error.data);
    });
  },
  //调机器人问答接口
  callRobotQA(){
    axios.post(ppdaiUrl+"callRobotQA", {
    
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res)=> {
      callback && callback(res)
    })
    .catch(function (error) {
      console.log("pp调机器人问答接口 error",error.data);
    });
  }
}
module.exports = ppdai;
