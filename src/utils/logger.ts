import * as winston from 'winston';
import config from '../../config';

function customJsonLogFormat(logName: string): winston.Logform.Format {
  return winston.format.printf(({level, message, ...rest}) => {
    return JSON.stringify({
      logName: logName, 
      severity: level.toUpperCase(),
      message,
      ...rest
    });
  })
}
const logName = `services/${config.service.name}-${config.env}/logs`;  

const logger = winston.createLogger({
  level: config.log.level,
  format: winston.format.combine(
    winston.format.timestamp(),
    customJsonLogFormat(logName),

  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
      consoleWarnLevels: ['warn', 'debug'],
    }),
  ],
  rejectionHandlers: [
    new winston.transports.Console({
      stderrLevels: ['error'],
      consoleWarnLevels: ['warn', 'debug'],
    }),
  ]
})

export { logger }
