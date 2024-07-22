const config = {
  env: process.env.ENV || 'dev',
  service: {
    name: process.env.SERVICE_NAME || 'service-x'
  },
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || '8080',
  },
  api: {
    version: process.env.API_VERSION || 'v1'
  },
  log: {
    level: process.env.LOG_LEVEL || 'debug',
  },
}

export default config
