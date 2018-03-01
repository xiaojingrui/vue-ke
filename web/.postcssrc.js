// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: [
    // to edit target browsers: use "browserslist" field in package.json
    require('autoprefixer')({
      browsers: ['iOS >= 7', 'Android >= 4.1'],
      cascade: true,
      remove: true
    }),
    // 以750为基准的设计稿，基准值给定40，所有的px单位放大一倍
    require('postcss-plugin-px2rem')({
      rootValue: 40,
      propWhiteList: [],
      propBlackList: [],
      selectorBlackList: [/^.*\.notPxToRem.*$/],
      minPixelValue: 5
    })
  ]
}
