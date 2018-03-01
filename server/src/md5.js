
const crypto = require('crypto'); //md5加密

const Encrypt = {
  md5Encrypt(str){
    let md5 = crypto.createHash('md5');//md5加密
    md5.update(str);
    str = md5.digest('hex');
    return str;
  }
}
module.exports = Encrypt;
