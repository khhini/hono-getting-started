import { Hono } from 'hono';

import healthCheckHandler from '../handlers/healthCheckHandler';

const router = new Hono();

router.route(`/healthz`, healthCheckHandler);

export default router
