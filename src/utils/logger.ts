import * as winston from 'winston';

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

function setupLogger(level: string, logName: string): winston.Logger {
  return winston.createLogger({
    level: level,
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
} 

export {setupLogger}
