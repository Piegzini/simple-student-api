const Controller = require('../../helpers/Controller');
const Student = require('../../patterns/models/student.model');
const Validator = require('../../patterns/schemas/student.schema');

class Students extends Controller {
    constructor(_collection, _model, _validator) {
        super(_collection, _model, _validator);
    }
}

const studentsController = new Students('students', Student, Validator);
module.exports = studentsController;
