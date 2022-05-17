const Controller = require('../helpers/Controller');
const Validator = require('../patterns/schemas/borrowing.schema');

class Borrowings extends Controller {
    constructor(_collection, _validator) {
        super(_collection, _validator);
    }
}

const borrowingsController = new Borrowings('borrowings', Validator);
module.exports = borrowingsController;
