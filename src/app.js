const express = require('express');
const PORT = 3000 || process.env.PORT;
const books = require('./routes/api/books.routes');
const borrowings = require('./routes/api/borrowings.routes');
const students = require('./routes/api/students.routes');
const users = require('./routes/users_service/users.routes');
const passport = require('passport');
require('dotenv').config();

const apiLogger = require('./middleware/apiLogger');
const helmet = require('helmet');

const bodyParser = require('body-parser');
const logger = require('./middleware/logger');
const requestId = require('./middleware/requestId');

require('./middleware/passport/config')(passport);

const app = express();

app.use(passport.initialize());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(requestId);
app.use(apiLogger);

app.use('/service/', users);
app.use('/api/v1/books', books);
app.use('/api/v1/borrowings', borrowings);
app.use('/api/v1/students', students);

app.listen(PORT, () => logger.info('Server is up!'));
