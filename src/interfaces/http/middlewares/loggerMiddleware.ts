import { createMiddleware } from 'hono/factory';
import { MiddlewareHandler } from 'hono';
import { setupLogger } from '../../../utils/logger';
import statusMessages from '../../../helpers/statusMessage';

function logger(level: string): MiddlewareHandler {
  const log = setupLogger(level); 
  
  return createMiddleware(async (c, next) => {
    const startTime = Date.now();
    const { method, path } = c.req;
    const userAgent = c.req.header('User-Agent');
    const remoteIp = c.req.header('X-Forwarded-For');
    const remoteHost = c.req.header('X-Forwarded-Host')

    let requestBody: any;
    try {
      requestBody = c.req.json();
    }catch (err) {
      requestBody = null;
    }

    const requestId = `${startTime}-${Math.random()}`;
    log.child({requestId, method, path})

    
    await next()

    const responseTime = Date.now() - startTime;
    const { status } = c.res;
    const statusMessage = statusMessages[status]

    const logFormat = { responseTime, status, userAgent, remoteIp, remoteHost, requestBody };
    const logMessage = `${method} ${path} ${status} ${statusMessage}`;  
    
    if(c.error) {
      
      const errorLogFormat = {
        errorMessage: c.error.message,
        stack: c.error.stack,
        ...logFormat
      }

      if (status >= 500 ) log.error(`ERROR: ${logMessage}`, errorLogFormat)
      else if (status >= 400 && status < 500 ) log.warn(`WARN: ${logMessage}`, errorLogFormat)

    } 
    
    else if (status === 404) log.warn(`WARN: ${logMessage}`, logFormat)
    else log.info(`INFO: ${logMessage}`, logFormat)

  })
}

export {logger}
