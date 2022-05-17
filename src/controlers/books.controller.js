const Controller = require('../helpers/Controller');
const Book = require('../patterns/models/book.model');
const validator = require('../patterns/schemas/book.schema');

class Books extends Controller {
    constructor(_collection, _model, _validator) {
        super(_collection, _model, _validator);
    }
}

const booksController = new Books('books', Book, validator);
module.exports = booksController;
