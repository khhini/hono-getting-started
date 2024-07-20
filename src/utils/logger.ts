import * as winston from 'winston';

function setupLogger(level: string): winston.Logger {
  return winston.createLogger({
    level: level,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.Console(),
    ],
    rejectionHandlers: [
      new winston.transports.Console(),
    ]
  })
} 

export {setupLogger}
