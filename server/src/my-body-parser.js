const querystring = require('querystring')
module.exports = {
  params() {
    return (req, res, next) => {
      var str = ''
      req.on('data', function(data) {
        str += data
      })
      req.on('end', function() {
        console.log('str:', str)
        req.body = querystring.parse(str)
        console.log('req.body', req.body)
        next()
      })
    }
  },
  getCookies(req) {
    var Cookies = {}
    req.headers.cookie &&
      req.headers.cookie.split(';').forEach(function(Cookie) {
        var parts = Cookie.split('=')
        Cookies[parts[0].trim()] = (parts[1] || '').trim()
      })
    return Cookies
  }
}
