import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception';
import config from '../config';

import { logger } from './interfaces/http/middlewares/loggerMiddleware';

import apiRouter from './interfaces/http/routes/api';
import metricRouter from './interfaces/http/routes/metric';

const app = new Hono()

app.use(logger(config.logging.level));

app.route(`/api/${config.api.version}/`, apiRouter);
app.route('/metrics', metricRouter);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse()
  }
  return c.json({
    message: err.message
  }, 500)
})

export default app
