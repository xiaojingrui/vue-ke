let config = {
  crmPrefix: 'http://crmchat.ppdai.com:8080',
  urlPrefix: 'ws://crmchat.ppdai.com:8080/webchat/cws?token='
}

if (process.env.NODE_ENV === 'production') {
  config.crmPrefix = 'http://crmchat.ppdai.com'
  config.urlPrefix = 'wss://crmchat.ppdai.com/webchat/cws?token='
}
export default config
