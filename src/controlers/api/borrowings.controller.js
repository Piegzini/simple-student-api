const Controller = require('../../helpers/Controller');
const Borrowing = require('../../patterns/models/borrowing.model');
const Validator = require('../../patterns/schemas/borrowing.schema');

class Borrowings extends Controller {
    constructor(_collection, _model, _validator) {
        super(_collection, _model, _validator);
    }
}

const borrowingsController = new Borrowings('borrowings', Borrowing, Validator);
module.exports = borrowingsController;
