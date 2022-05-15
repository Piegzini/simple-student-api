const express = require('express')
const PORT = 3000 || process.env.PORT
const books = require('./src/routes/books.routes')
const borrowings = require('./src/routes/borrowings.routes')
const students = require('./src/routes/students.routes')
const apiLogger = require('./src/middleware/apiLogger')

const bodyParser = require('body-parser')
const logger = require('./src/middleware/logger')
const requestId = require('./src/middleware/requestId')

express.urlencoded({ extended: true })

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(requestId)
app.use(apiLogger)

app.use('/books', books)
app.use('/borrowings', borrowings)
app.use('/students', students)

app.listen(PORT, () => logger.info('Server is up!'))
