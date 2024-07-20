import { Hono } from 'hono';

const handler = new Hono();

handler.get('/', (c) => {
  return c.json({
    status: "HEALTHY"
  })
})

export default handler
