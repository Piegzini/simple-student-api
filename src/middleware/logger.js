const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label } = format

const myFormat = format.printf(({ level, label, message, timestamp }) => {
    return `${timestamp} [${label || '-'}] ${level}: ${message}`
})

const logger = createLogger({
    format: combine(
        format.colorize(),
        timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
        myFormat
    ),
    transports: [new transports.Console()],
})

module.exports = logger
