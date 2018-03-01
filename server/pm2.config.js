module.exports = {
  apps: [
    {
      name: 'server',
      script: './dist/crmServer.js',
      watch: ['dist'],
      source_map_support: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
