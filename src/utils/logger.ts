import * as winston from 'winston';

const customJsonLogFormat = winston.format.printf(({level, message, ...rest}) => {
  return JSON.stringify({
    severity: level.toUpperCase(),
    message,
    ...rest
  });
}) 

function setupLogger(level: string): winston.Logger {
  return winston.createLogger({
    level: level,
    format: winston.format.combine(
      winston.format.timestamp(),
      customJsonLogFormat

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
} 

export {setupLogger}
