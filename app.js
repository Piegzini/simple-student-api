const express = require('express')
const PORT = 3000 || process.env.PORT
const books = require('./src/routes/books.routes')
const borrowings = require('./src/routes/borrowings.routes')
const students = require('./src/routes/students.routes')

const bodyParser = require('body-parser')

express.urlencoded({ extended: true })

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/books', books)
app.use('/borrowings', borrowings)
app.use('/students', students)

app.listen(PORT, () => console.log('Server is up!'))
