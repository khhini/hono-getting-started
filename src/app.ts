import { Hono } from 'hono'
import config from '../config';

import apiRouter from './interfaces/http/routes/api';

const app = new Hono()

app.route(`/${config.api.version}/api`, apiRouter);

export default app
