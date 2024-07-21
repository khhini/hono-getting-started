import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { randomError } from '../../../helpers/randomError';

class HealthCheckHandler {
  private handler: Hono

  constructor() {
    this.handler = new Hono();
  }

  init() {
    this.handler.get('/', (c) => { 
      if(randomError(0.1)) {
        throw new HTTPException(500, {message: 'Internal Server Error'})
      }

      return c.json({
        status: "HEALTHY"
      }, 200);
    });
  }

  getHandler(): Hono {
    return this.handler
  }
}

export default HealthCheckHandler
