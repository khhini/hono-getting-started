import app from './app';
import config from '../config';


const server = Bun.serve({
  hostname: config.server.host,
  port: config.server.port,
  fetch: app.fetch
});

console.log(`Listening on http://${server.hostname}:${server.port} ...`);
