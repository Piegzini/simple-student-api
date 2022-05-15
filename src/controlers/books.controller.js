const Controller = require('../utlis/Controller');
const Validator = require('../schemas/book.schema');

class Books extends Controller {
    constructor(_collection, _validator) {
        super(_collection, _validator);
    }
}

const booksController = new Books('books', Validator);
module.exports = booksController;
