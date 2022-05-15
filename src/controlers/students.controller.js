const Controller = require('../utlis/Controller');
const Validator = require('../schemas/student.schema');

class Students extends Controller {
    constructor(_collection, _validator) {
        super(_collection, _validator);
    }
}

const studentsController = new Students('students', Validator);
module.exports = studentsController;
