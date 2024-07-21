import { Hono } from 'hono';

import HealthCheckHandler from '../handlers/healthCheckHandler';

const healthCheckHandler = new HealthCheckHandler();
healthCheckHandler.init();

const router = new Hono();

router.route(`/healthz`, healthCheckHandler.getHandler());

export default router
