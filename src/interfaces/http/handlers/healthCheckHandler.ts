import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { randomError } from '../../../helpers/randomError';

const handler = new Hono();

handler.get('/', (c) => { 

  if(randomError(0.1)) {
    throw new HTTPException(500, {message: 'Internal Server Error'})
  }

  return c.json({
    status: "HEALTHY"
  }, 200)
})

export default handler
