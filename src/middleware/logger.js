const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label } = format

const myFormat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`
})

const logger = createLogger({
    format: combine(
        format.colorize(),
        timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
        myFormat
    ),
    // defaultMeta: { service: 'user-service' },
    transports: [new transports.Console()],
})

module.exports = logger
