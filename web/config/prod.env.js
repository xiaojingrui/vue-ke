var env = '"test"'

if (process.env.npm_config_cdn) {
  env = '"production"'
}

module.exports = {
  NODE_ENV: env
}
