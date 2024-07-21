import * as winston from 'winston';

function setupLogger(level: string): winston.Logger {
  return winston.createLogger({
    level: level,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
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
