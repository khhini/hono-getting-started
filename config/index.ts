const config = {
  env: process.env.ENV || 'dev',
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || '8080',
  }
}

export default config
