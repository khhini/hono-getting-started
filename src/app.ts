import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception';
import config from '../config';

import { logger } from './interfaces/http/middlewares/loggerMiddleware';

import apiRouter from './interfaces/http/routes/api';

const app = new Hono()

app.use(logger(config.logging.level));

app.route(`/${config.api.version}/api`, apiRouter);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse()
  }
  return c.json({
    message: err.message
  }, 500)
})

export default app
