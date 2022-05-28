const express = require('express');
const books = require('./routes/api/books.routes');
const borrowings = require('./routes/api/borrowings.routes');
const students = require('./routes/api/students.routes');
const users = require('./routes/users_service/users.routes');

const passport = require('passport');
const cors = require('cors');

// const apiLogger = require('./middleware/apiLogger');
const helmet = require('helmet');

const bodyParser = require('body-parser');
// const logger = require('./middleware/logger');
const requestId = require('./middleware/requestId');
const path = require('path');
const cookieParser = require('cookie-parser');

require('./middleware/passport/config')(passport);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(passport.initialize());

app.use(requestId);
// app.use(apiLogger);
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const apiUrl = '/api/v1/';
app.use('/service/', users);

app.use(`${apiUrl}books`, books);
app.use(`${apiUrl}borrowings`, borrowings);
app.use(`${apiUrl}students`, students);

module.exports = app;
