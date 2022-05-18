const express = require('express');
const PORT = 3000 || process.env.PORT;
const books = require('./src/routes/books.routes');
const borrowings = require('./src/routes/borrowings.routes');
const students = require('./src/routes/students.routes');
const apiLogger = require('./src/middleware/apiLogger');
const helmet = require('helmet');

const bodyParser = require('body-parser');
const logger = require('./src/middleware/logger');
const requestId = require('./src/middleware/requestId');

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(requestId);
app.use(apiLogger);

app.use('/api/v1/books', books);
app.use('/api/v1/borrowings', borrowings);
app.use('/api/v1/students', students);

app.listen(PORT, () => logger.info('Server is up!'));
