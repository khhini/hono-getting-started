import app from './app';
import config from '../config';
import { logger } from './utils/logger';


const server = Bun.serve({
  hostname: config.server.host,
  port: config.server.port,
  fetch: app.fetch
});

logger.info(`Listening on http://${server.hostname}:${server.port} ...`);
