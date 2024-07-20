const config = {
  env: process.env.ENV || 'dev',
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || '8080',
  },
  api: {
    version: process.env.API_VERSION || 'v1'
  },
  logging: {
    level: process.env.LOGGING_LEVEL || 'info'
  }
}

export default config
