import { createMiddleware } from 'hono/factory';
import { MiddlewareHandler } from 'hono';
import { logger } from '../../../utils/logger';
import statusMessages from '../../../helpers/statusMessage';

function loggingMiddleware(): MiddlewareHandler {
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
    logger.child({requestId, method, path})

    
    await next()

    const responseTime = Date.now() - startTime;
    const { status } = c.res;
    const statusMessage = statusMessages[status]

    const logFormat = { httpRequest: {
        requestMethod: method,
        requestUrl: path,
        status,
        userAgent,
        remoteIp,
        remoteHost,
        requestBody,
        responseTime,
      }};
    const logMessage = `${method} ${path} ${status} ${statusMessage}`;  
    
    if(c.error) {
      
      const errorLogFormat = {
        error: {
          message: c.error.message,
          stack: c.error.stack,
          cause: c.error.cause
        },
        ...logFormat
      }

      if (status >= 500 ) logger.error(`ERROR: ${logMessage}`, errorLogFormat)
      else if (status >= 400 && status < 500 ) logger.warn(`WARN: ${logMessage}`, errorLogFormat)

    } 
    
    else if (status === 404) logger.warn(`WARN: ${logMessage}`, logFormat)
    else logger.info(`INFO: ${logMessage}`, logFormat)

  })
}

export { loggingMiddleware }
